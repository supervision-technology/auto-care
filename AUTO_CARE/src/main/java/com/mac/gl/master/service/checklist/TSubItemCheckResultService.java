/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.checklist;

import com.mac.gl.master.model.checklist.TDailyCleckList;
import com.mac.gl.master.model.item.MItem;
import com.mac.gl.master.model.item.MSubItem;
import com.mac.gl.master.model.checklist.TSubItemCheckResult;
import com.mac.gl.master.model.item.Items;
import com.mac.gl.master.repository.checklist.SubItemRepository;
import com.mac.gl.master.repository.checklist.TDailyCleckListRepository;
import com.mac.gl.master.repository.checklist.TSubItemCheckResultRepository;
import com.mac.gl.master.repository.item.ItemRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
import java.util.ArrayList;
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
public class TSubItemCheckResultService {

    @Autowired
    private TSubItemCheckResultRepository subItemCheckResultRepository;
    @Autowired
    private TDailyCleckListRepository dailyCleckListRepository;

    @Autowired
    private SubItemRepository subItemRepository;

    @Autowired
    private ItemRepository itemRepository;

    public List<TSubItemCheckResult> insertSubItemList(Integer transaction, Integer branch, Date date, TDailyCleckList dailyCheckList) {
        List<TDailyCleckList> lits = dailyCleckListRepository.findByBranchAndDate(branch, date);
        if (lits.isEmpty()) {
            //TODO code application logic here 
            System.out.println("emplty");
            List<MSubItem> subItems = subItemRepository.findAll();
            TDailyCleckList dailyCheckList1 = dailyCleckListRepository.save(dailyCheckList);
            for (int i = 0; i < subItems.size(); i++) {
                subItemCheckResultRepository.save(new TSubItemCheckResult(false, subItems.get(i), dailyCheckList1));
            }
        } else {
            // TODO code application logic here 
            throw new DuplicateEntityException("this date is allrady");
        }

        return subItemCheckResultRepository.findAll();
    }

    public List<TSubItemCheckResult> findByItem(MItem item, Date date) {
        return subItemCheckResultRepository.findBySubItemItemAndDailyCheckListDate(item, date);
    }

    public Integer updateConfirmation(TSubItemCheckResult subItemCheckResult) {
        subItemCheckResultRepository.save(subItemCheckResult);
        List<TSubItemCheckResult> checkedItemSizeGetList = subItemCheckResultRepository.findBySubItemItemAndChecked(subItemCheckResult.getSubItem().getItem(), true);
        return checkedItemSizeGetList.size();
    }

    public List<Items> getALlItems(Date date) {
        List<MItem> itemList = itemRepository.findAll();
        List<Items> sendItemList = new ArrayList<Items>();
        for (int i = 0; i < itemList.size(); i++) {
            List<TSubItemCheckResult> sizeGetList = subItemCheckResultRepository.findBySubItemItemAndDailyCheckListDate(itemList.get(i), date);
            List<TSubItemCheckResult> checkedItemSizeGetList = subItemCheckResultRepository.findBySubItemItemAndChecked(itemList.get(i), true);
            sendItemList.add(new Items(itemList.get(i), sizeGetList.size(), checkedItemSizeGetList.size()));
        }
        return sendItemList;
    }
}
