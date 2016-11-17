/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.checklist;

import com.mac.gl.master.model.item.TItemCheckResult;
import com.mac.gl.master.model.item.TSubItemCheckResult;
import com.mac.gl.master.service.TItemCheckResultService;
import com.mac.gl.master.service.TSubItemCheckResultService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @Autowired
    private TSubItemCheckResultService subItemCheckResultService;

    @RequestMapping(value = "/get-sub-item-check-list", method = RequestMethod.POST)
    public List<TSubItemCheckResult> findALlSubItemCheckList(@RequestBody TItemCheckResult itemCheckResult) {
        return subItemCheckResultService.findByBranchAndItem(BRANCH, itemCheckResult.getItem());
    }

    @RequestMapping(value = "/incert-sub-item-check-list", method = RequestMethod.GET)
    public List<TSubItemCheckResult> incertCheckSubItemList() {
        return subItemCheckResultService.insertSubItemList(TRANSACTION, BRANCH);
    }

    @RequestMapping(value = "/update-confirmation", method = RequestMethod.POST)
    public TSubItemCheckResult updateConfirmation(@RequestBody TSubItemCheckResult subItemCheckResult) {
        System.out.println(subItemCheckResult.getSubItem().getItem().getIndexNo());
        return subItemCheckResultService.updateConfirmation(subItemCheckResult);
    }

    @RequestMapping(value = "/get-cheked-sub-items", method = RequestMethod.POST)
    public Integer getSubItems(@RequestBody TItemCheckResult itemCheckResult) {
        return subItemCheckResultService.getChekedItemSupplier(BRANCH, itemCheckResult.getItem(), true);
    }
}
