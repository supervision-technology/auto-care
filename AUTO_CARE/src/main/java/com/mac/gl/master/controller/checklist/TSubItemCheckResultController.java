/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.checklist;

import com.mac.gl.master.model.checklist.TDailyCleckList;
import com.mac.gl.master.model.checklist.TSubItemCheckResult;
import com.mac.gl.master.model.item.MItem;
import com.mac.gl.master.service.checklist.TSubItemCheckResultService;
import java.util.Date;
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
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/sub-item-check-list")
public class TSubItemCheckResultController {

    private final Integer TRANSACTION = 1;
    private final Integer BRANCH = 1;
    private final Date DATE = new Date();

    @Autowired
    private TSubItemCheckResultService subItemCheckResultService;

    @RequestMapping(value = "/get-sub-item-check-list", method = RequestMethod.POST)
    public List<TSubItemCheckResult> findALlSubItemCheckList(@RequestBody MItem item) {
        return subItemCheckResultService.findByItem(item, DATE);
    }

    @RequestMapping(value = "/incert-sub-item-check-list/{date}", method = RequestMethod.POST)
    public List<TSubItemCheckResult> incertCheckSubItemList(@PathVariable String date) {
        TDailyCleckList dailyCleckList = new TDailyCleckList(new Date(), BRANCH, TRANSACTION, false);
        return subItemCheckResultService.insertSubItemList(TRANSACTION, BRANCH, DATE, dailyCleckList);
    }

    @RequestMapping(value = "/update-confirmation", method = RequestMethod.POST)
    public Integer updateConfirmation(@RequestBody TSubItemCheckResult subItemCheckResult) {
        return subItemCheckResultService.updateConfirmation(subItemCheckResult);
    }
}
