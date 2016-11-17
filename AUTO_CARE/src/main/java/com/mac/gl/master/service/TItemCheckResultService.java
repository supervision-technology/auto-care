/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service;

import com.mac.gl.master.model.item.MItem;
import com.mac.gl.master.model.item.TItemCheckResult;
import com.mac.gl.master.model.item.TSubItemCheckResult;
import com.mac.gl.master.repository.checklist.TItemCheckResultRepository;
import com.mac.gl.master.repository.checklist.TSubItemCheckResultRepository;
import com.mac.gl.master.repository.item.ItemRepository;
import java.util.Date;
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
public class TItemCheckResultService {

    @Autowired
    private TItemCheckResultRepository itemCheckResultRepository;

    @Autowired
    private TSubItemCheckResultRepository subItemCheckResultRepository;

    @Autowired
    private ItemRepository itemRepository;

    public List<TItemCheckResult> insertItems(Integer transaction, Date date, Integer branch) {
        List<MItem> items = itemRepository.findAll();
        for (int i = 0; i < items.size(); i++) {
            List<TSubItemCheckResult> itemLists = subItemCheckResultRepository.findByBranchAndSubItemItem(branch, items.get(i));
            itemCheckResultRepository.save(new TItemCheckResult(transaction, false, date, itemLists.size(), 0, branch, items.get(i)));
        }
        return itemCheckResultRepository.findAll();
    }

    public List<TItemCheckResult> findByBranch(Integer branch) {
        return itemCheckResultRepository.findByBranch(branch);
    }

    public TItemCheckResult updateWatingCheked(TItemCheckResult itemCheckResult) {
        return itemCheckResultRepository.save(itemCheckResult);
    }

}
