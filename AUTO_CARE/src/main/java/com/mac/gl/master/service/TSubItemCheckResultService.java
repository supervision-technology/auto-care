/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service;

import com.mac.gl.master.model.MItem;
import com.mac.gl.master.model.MSubItem;
import com.mac.gl.master.model.TSubItemCheckResult;
import com.mac.gl.master.repository.SubItemRepository;
import com.mac.gl.master.repository.TSubItemCheckResultRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class TSubItemCheckResultService {

    @Autowired
    private TSubItemCheckResultRepository subItemCheckResultRepository;

    @Autowired
    SubItemRepository subItemRepository;

    public List<TSubItemCheckResult> insertSubItemList(Integer transaction, Integer branch) {
        List<MSubItem> subItems = subItemRepository.findAll();
        for (int i = 0; i < subItems.size(); i++) {
            subItemCheckResultRepository.save(new TSubItemCheckResult(false, transaction, branch, subItems.get(i)));
        }
        return subItemCheckResultRepository.findAll();
    }

    public List<TSubItemCheckResult> findByBranchAndItem(Integer branch, MItem item) {
        return subItemCheckResultRepository.findByBranchAndSubItemItem(branch, item);
    }

    public TSubItemCheckResult updateConfirmation(TSubItemCheckResult subItemCheckResult) {
        return subItemCheckResultRepository.save(subItemCheckResult);
    }

    public Integer getChekedItemSupplier(Integer branch, MItem item, Boolean cheked) {
        List<TSubItemCheckResult> list = subItemCheckResultRepository.findByBranchAndSubItemItemAndChecked(branch, item, cheked);
        return list.size();
    }
}
