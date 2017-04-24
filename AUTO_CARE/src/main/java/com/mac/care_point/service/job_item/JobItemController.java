/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.service.job_item.model.TJobItem;
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
 * @author Kavish Manjitha
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/job-item")
public class JobItemController {

    @Autowired
    private JobItemService jobItemService;

    //for service selections
    @RequestMapping(value = "/save-job-items", method = RequestMethod.POST)
    public TJobItem saveJobItem(@RequestBody TJobItem jobItem) {
        return jobItemService.saveJobItem(jobItem);
    }

    //for service selections
    @RequestMapping(value = "/delete-job-items/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteJobItem(@PathVariable Integer indexNo) {
        jobItemService.deleteJobItem(indexNo);
        return indexNo;
    }

    //for service selections
    @RequestMapping(value = "/find-by-job-card-items/{jobCardIndexNo}", method = RequestMethod.GET)
    public List<TJobItem> findByJobCardItems(@PathVariable Integer jobCardIndexNo) {
        return jobItemService.findByJobCardItems(jobCardIndexNo);

    }

    //for final check list(complited and pending)
    @RequestMapping(value = "/check-item/{item}/{status}", method = RequestMethod.GET)
    public TJobItem checkItem(@PathVariable Integer item, @PathVariable String status) {
        return jobItemService.checkItem(item, status);

    }
}
