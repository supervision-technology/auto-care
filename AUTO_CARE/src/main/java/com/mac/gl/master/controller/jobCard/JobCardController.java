/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.jobCard;

import com.mac.gl.master.model.jobCard.JobCard;
import com.mac.gl.master.service.jobCard.JobCardService;
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
@RequestMapping("/api/green-leaves/transaction/job-card")
public class JobCardController {
    @Autowired
    private JobCardService jobCardService;

    @RequestMapping(method = RequestMethod.GET)
    public List<JobCard> findAll() {
        return jobCardService.findAll();
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
