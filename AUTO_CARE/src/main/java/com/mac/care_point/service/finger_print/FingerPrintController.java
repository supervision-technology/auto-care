/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.finger_print;

import com.mac.care_point.service.employee_assignment.model.TEmployeeAssingment;
import com.mac.care_point.service.finger_print.model.TFingerPrint;
import com.mac.care_point.service.finger_print.model.TFingerPrintMashine;
import com.mac.care_point.zutil.SecurityUtil;
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
 * @author 'Kasun Chamara'
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/care-point/transaction/finger-print")
public class FingerPrintController {

    @Autowired
    FingerPrintService fingerPrintService;

    @RequestMapping(value = "/manual-save", method = RequestMethod.POST)
    public Integer insertDetail(@RequestBody TFingerPrint fingerPrint) {                
        return fingerPrintService.save(fingerPrint);
    }
    
    @RequestMapping(value = "/load-mashine", method = RequestMethod.GET)
    public List<TFingerPrintMashine> loadMashine() {
        return fingerPrintService.loadMashine(SecurityUtil.getCurrentUser().getBranch());
    }
    
    @RequestMapping(value = "/load-data/{date}", method = RequestMethod.GET)
    public List<TEmployeeAssingment> loadData(@PathVariable String date) {
        return fingerPrintService.loadData(SecurityUtil.getCurrentUser().getBranch(),date);
    }
}
