/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.checklist;

import com.mac.gl.master.model.item.Items;
import com.mac.gl.master.service.checklist.TSubItemCheckResultService;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/all-items")
public class TitemCheckResultController {

    @Autowired
    private TSubItemCheckResultService subItemCheckResultService;

    private final Date DATE = new Date();

    @RequestMapping(method = RequestMethod.GET)
    public List<Items> findALLTItemCheckResult() {
        return subItemCheckResultService.getALlItems(DATE);
    }
}
