/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.bay_item_issue;

import com.mac.care_point.service.bay_item_issue.model.TBayIssue;
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
 * @author kavish manjitha
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/care-point/transaction/bay-item-issue")
public class TBayIssueController {

    @Autowired
    private TBayIssueService tBayIssueService;

    private final Integer BRANCH = 1;

    @RequestMapping(value = "/save-bay-item-issue", method = RequestMethod.POST)
    public TBayIssue saveBayItemIssue(@RequestBody TBayIssue tBayIssue) {
        return tBayIssueService.saveTBayIssue(tBayIssue);
    }

    @RequestMapping(value = "/delete-bay-item-issue/{bay}", method = RequestMethod.DELETE)
    public Integer deleteBayItemIssue(@PathVariable Integer bay) {
        tBayIssueService.deleteTBayIssue(bay);
        return bay;
    }

    @RequestMapping(value = "/find-bay-item-issue/{bay}", method = RequestMethod.GET)
    public List<TBayIssue> findBayItemIssueByBay(@PathVariable Integer bay) {
        return tBayIssueService.findBayItemIssueByBay(bay);
    }

    //for final check list(complited and pending)
    @RequestMapping(value = "/check-item/{bayIssueIndexNo}/{status}", method = RequestMethod.GET)
    public TBayIssue checkItem(@PathVariable Integer bayIssueIndexNo, @PathVariable String status) {
        //TODO:get login branch
        return tBayIssueService.checkItem(bayIssueIndexNo, BRANCH,status);
    }
}
