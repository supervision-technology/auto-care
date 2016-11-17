/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller;

import com.mac.gl.master.model.TItemCheckResult;
import com.mac.gl.master.service.TItemCheckResultService;
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
@RequestMapping("/api/care-point/item-check-list")
public class TitemCheckResultController {

    private final Integer TRANSACTION = 1;
    private final Date DATE = new Date();
    private final Integer BRANCH = 1;

    @Autowired
    private TItemCheckResultService itemCheckResultService;

    @RequestMapping(method = RequestMethod.GET)
    public List<TItemCheckResult> findALLTItemCheckResult() {
        return itemCheckResultService.findByBranch(BRANCH);
    }

    @RequestMapping(value = "/insert-item-check-list", method = RequestMethod.GET)
    public List<TItemCheckResult> incertCheckItemList() {
        return itemCheckResultService.insertItems(TRANSACTION, DATE, BRANCH);
    }

}
