/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.employee;

import com.mac.care_point.master.employee.model.Employee;
import static com.mac.care_point.service.job_card.JobCardController.IMAGE_LOCATION;
import static com.mac.care_point.service.job_card.JobCardController.IMAGE_NAME_FILTER_TEMPLATE;
import static com.mac.care_point.service.job_card.JobCardController.IMAGE_NAME_TEMPLATE;
import com.mac.care_point.zutil.SecurityUtil;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author kavish manjitha
 */
@RestController
@CrossOrigin
@RequestMapping("/api/care-point/master/employee")
public class EmployeeController {

    final String employeeType = "worker";

    @Autowired
    private EmployeeService employeeService;

    public static final String IMAGE_LOCATION = "./employee-images";
    public static final String IMAGE_NAME_FILTER_TEMPLATE = "employee-%s-%s";
    public static final String IMAGE_NAME_TEMPLATE = "employee-%s-%s.jpg";
    public static final String IMAGE_URL = "./employee-images/employee-%s-%s.jpg";

    @RequestMapping(method = RequestMethod.GET)
    public List<Employee> findAll() {
        return employeeService.findAll();
    }

    @RequestMapping(value = "/save-employee", method = RequestMethod.POST)
    public Employee saveEmployee(@RequestBody Employee employee) {
        employee.setBranch(SecurityUtil.getCurrentUser().getBranch());
        employee.setBay(11);
        Employee employee1 = employeeService.saveEmployee(employee);
        employee1.setImage(String.format(IMAGE_NAME_TEMPLATE, employee1.getName(), employee1.getIndexNo()));
        return employeeService.saveEmployee(employee1);
    }

    @RequestMapping(value = "/upload-image/{name}/{indexNo}", method = RequestMethod.POST)//, consumes = "multipart/form-data"
    public void saveImage(@RequestParam("file") MultipartFile file, @PathVariable("name") String name, @PathVariable("indexNo") String indexNo) throws IOException {
        File uploadFile = new File(IMAGE_LOCATION, String.format(IMAGE_NAME_TEMPLATE, name, indexNo));
        if (!uploadFile.getParentFile().exists()) {
            uploadFile.getParentFile().mkdirs();
        }

        BufferedImage bufferedImage = ImageIO.read(file.getInputStream());

        ImageIO.write(bufferedImage, "JPG", uploadFile);
    }

    @RequestMapping(value = "/download-image/{fileName:.+}", method = RequestMethod.GET)
    public void downloadImage(@PathVariable String fileName, HttpServletResponse response) throws FileNotFoundException, IOException {
        InputStream inputStream = new FileInputStream(IMAGE_LOCATION + "/" + fileName);

        OutputStream outputStream = response.getOutputStream();

        byte[] bytes = new byte[1024];
        while (inputStream.read(bytes) > 0) {
            outputStream.write(bytes);
        }
        outputStream.flush();
    }

   @RequestMapping(value = "/delete-image/{fileName:.+}", method = RequestMethod.GET)
    public boolean deleteImage(@PathVariable String fileName, HttpServletResponse response) throws FileNotFoundException, IOException {
        File file = new File(IMAGE_LOCATION + "/" + fileName);
        return file.delete();
    }
    
    public boolean deleteImages(@PathVariable String fileName) throws FileNotFoundException, IOException {
        File file = new File(IMAGE_LOCATION + "/" + fileName);
        return file.delete();
    }

    @RequestMapping(value = "/image-names/{name}/{indexNo}", method = RequestMethod.GET)
    public List<String> imageName(@PathVariable("name") String name, @PathVariable("indexNo") String indexNo) {
        File imageDir = new File(IMAGE_LOCATION);
        File[] imageFiles = imageDir.listFiles((File pathname) -> {
            return pathname.getName().startsWith(String.format(IMAGE_NAME_FILTER_TEMPLATE, name, indexNo));
        });

        List<String> imageFileNames = new ArrayList<>();
        for (File imageFile : imageFiles) {
            imageFileNames.add(imageFile.getName());
        }

        return imageFileNames;
    }

    @RequestMapping(value = "/delete-employee/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteEmployee(@PathVariable("indexNo") Integer indexNo) throws IOException {
        Employee employee = employeeService.findByIndexNo(indexNo);
        deleteImages(employee.getImage());
        employeeService.deleteEmployee(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/worker", method = RequestMethod.GET)
    public List<Employee> findByType() {
        return employeeService.findByType(employeeType);
    }

}
