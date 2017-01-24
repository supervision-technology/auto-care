/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.jobCard;

import com.mac.care_point.service.jobCard.model.JobCard;
import com.mac.care_point.service.jobCard.model.TJobItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/job-card")
public class JobCardController {

    @Autowired
    private JobCardService jobCardService;

    @Autowired
    private JobItemService jobItemService;

    @RequestMapping(method = RequestMethod.GET)
    public List<JobCard> findAll() {
        return jobCardService.findAll();
    }

    @RequestMapping(value = "/find-job-history/{vehicle}", method = RequestMethod.GET)
    public List<JobCard> findByJobHistory(@PathVariable Integer vehicle) {
        return jobCardService.findByVehicle(vehicle);
    }

    @RequestMapping(value = "/find-job-item-history/{jobCardNo}", method = RequestMethod.GET)
    public List<TJobItem> findByJobItemHistory(@PathVariable Integer jobCardNo) {
        return jobItemService.findByJobCardIndexNo(jobCardNo);
    }

    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public JobCard insertDetail(@RequestBody JobCard jobCard) {
        return jobCardService.saveItemDepartment(jobCard);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteDetail(@PathVariable Integer indexNo) {
        jobCardService.deleteItemDepartment(indexNo);
        return indexNo;
    }
}
