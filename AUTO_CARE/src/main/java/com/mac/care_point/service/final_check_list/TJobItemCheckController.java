/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.final_check_list;

import com.mac.care_point.service.final_check_list.model.TJobItemCheck;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kavish manjitha
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/care-point/transaction/job-item-check")
public class TJobItemCheckController {

    @Autowired
    private TJobItemCheckService jobItemCheckService;

    @RequestMapping(value = "/find-by-job-item/{jobItem}", method = RequestMethod.GET)
    public List<TJobItemCheck> findByJobItem(@PathVariable Integer jobItem) {
        return jobItemCheckService.findByJobItem(jobItem);
    }

    @RequestMapping(value = "/checked-job-item/{indexNo}/{status}", method = RequestMethod.GET)
    public TJobItemCheck checkedItem(@PathVariable Integer indexNo, @PathVariable String status) {
        return jobItemCheckService.checkedItem(indexNo, status);
    }
   
}
