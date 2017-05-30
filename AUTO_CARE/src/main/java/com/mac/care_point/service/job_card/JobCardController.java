/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card;

import com.mac.care_point.service.job_card.model.JobCard;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
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
 * @author Kavish Manjitha
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/job-card")
public class JobCardController {

    @Autowired
    private JobCardService jobCardService;
    
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss-S");

    @RequestMapping(value = "/get-client-history/{indexNo}", method = RequestMethod.GET)
    public List<JobCard> getClientHistory(@PathVariable Integer indexNo) {
        return jobCardService.getClientHistory(indexNo);
    }

    @RequestMapping(value = "/get-job-card/{indexNo}", method = RequestMethod.GET)
    public JobCard getJobCard(@PathVariable Integer indexNo) {
        return jobCardService.getJobCard(indexNo);
    }

    @RequestMapping(value = "/get-pending-job-cards", method = RequestMethod.GET)
    public List<JobCard> getPendingJobCard() {
        return jobCardService.getPendingJobCard();
    }

    @RequestMapping(value = "/save-job-card", method = RequestMethod.POST)
    public Integer saveJovCard(@RequestBody JobCard jobCard) {
        jobCard.setBranch(1);
        return jobCardService.saveJobCard(jobCard).getIndexNo();
    }
    @RequestMapping(value = "/service-charge/{jobCard}/{status}", method = RequestMethod.GET)
    public JobCard setServiceChargers(@PathVariable Integer jobCard,@PathVariable Boolean status) {
        return jobCardService.setServiceChargers(jobCard,status);
    }

    @RequestMapping(value = "/upload-image", method = RequestMethod.POST)//, consumes = "multipart/form-data"
    public void saveImage(@RequestParam("file") MultipartFile file) {
        try {
           // System.out.println(file.getSize());
            String fileName = dateFormat.format(new Date());
            fileName = Base64.getEncoder().encodeToString(fileName.getBytes()) + file.getOriginalFilename();

            
            //System.out.println(fileName);
            File uploadFile = new File("./files", fileName);
            if (!uploadFile.getParentFile().exists()) {
                uploadFile.getParentFile().mkdirs();
            }

            uploadFile.createNewFile();

            FileOutputStream fileOutputStream = new FileOutputStream(uploadFile);
            fileOutputStream.write(file.getBytes());

        } catch (Exception a) {
            a.printStackTrace();
        }
    }
}
