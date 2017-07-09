/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.report.direct_print;

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
@RequestMapping("/api/v1/report/ditect-print")
public class DirectPrintController {

    @Autowired
    private DirectPrintService directPrintService;

    @RequestMapping(value = "/find-by-job-card-items/{jobCardIndexNo}", method = RequestMethod.GET)
    public Integer findByJobCardItems(@PathVariable Integer jobCardIndexNo) {
        return directPrintService.findByJobCard(jobCardIndexNo);

    }
}
