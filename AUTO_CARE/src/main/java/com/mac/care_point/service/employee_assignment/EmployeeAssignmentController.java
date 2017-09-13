/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_assignment;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.employee_assignment.model.ImageModel;
import com.mac.care_point.service.employee_assignment.model.TEmployeeAssingment;
import static com.mac.care_point.service.job_card.JobCardController.IMAGE_LOCATION;
import static com.mac.care_point.service.job_card.JobCardController.IMAGE_NAME_FILTER_TEMPLATE;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author L T430
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/care-point/transaction/employee-assignment")
public class EmployeeAssignmentController {

    Integer branch = 1;

    @Autowired
    EmployeeAssignmentService employeeAssignmentService;

    @RequestMapping(method = RequestMethod.GET)
    public List<TEmployeeAssingment> findAll() {
        return employeeAssignmentService.findAll();
    }

    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public TEmployeeAssingment insertDetail(@RequestBody TEmployeeAssingment employeeAssingment) {
        employeeAssingment.setDate(new Date());
        employeeAssingment.setStatus(Constant.PENDING_STATUS);
        return employeeAssignmentService.saveDetail(employeeAssingment);
    }

    @RequestMapping(value = "/bay-employee-count/{bay}", method = RequestMethod.GET)
    public Integer getBayAssignEmployeeCount(@PathVariable Integer bay) {
        return employeeAssignmentService.getBayAssignEmployeeCount(bay, branch);
    }

    @RequestMapping(value = "/file-absalute-path", method = RequestMethod.GET)
    public ImageModel fileAbsalutePath() {
        System.out.println("started");
        File imageDir = new File("employee-images");
        String val=imageDir.getAbsoluteFile().getPath();
        System.out.println(val);
        System.out.println(val);
        System.out.println(val);
        System.out.println(val);
        ImageModel imageModel=new ImageModel();
        imageModel.setImagePath(val);
        return imageModel;
    }
    @RequestMapping(value = "/get-image/{path:.+}", method = RequestMethod.GET)
    public void loadImage(@PathVariable String path, HttpServletResponse response) {
        System.out.println(path);
        
        File file = new File("./employee_images/" + path);

        System.out.println(file.getAbsolutePath());
        try {
//            response.setHeader("Content-Disposition:", "attachment; filename=\"my-file\"");
            OutputStream outputStream = response.getOutputStream();

            FileInputStream inputStream = new FileInputStream(file);
            byte[] read = new byte[8196];
            int c = 0;
            while ((c = inputStream.read(read, 0, read.length)) > 0) {
                outputStream.write(read, 0, c);
                outputStream.flush();
            }
            inputStream.close();
            outputStream.close();

        } catch (IOException ex) {
            Logger.getLogger(EmployeeAssignmentController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
