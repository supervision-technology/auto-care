/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.check_list;

import com.mac.care_point.master.check_list.model.TDailyCleckList;
import com.mac.care_point.master.item.model.MItem;
import com.mac.care_point.master.item.MSubItem;
import com.mac.care_point.master.check_list.model.TSubItemCheckResult;
import com.mac.care_point.master.item.Items;
import com.mac.care_point.master.check_list.SubItemRepository;
import com.mac.care_point.master.check_list.TDailyCleckListRepository;
import com.mac.care_point.master.check_list.TSubItemCheckResultRepository;
import com.mac.care_point.master.item.ItemRepository;
import com.mac.care_point.system.exception.DuplicateEntityException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.dom4j.Branch;
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
            System.out.println("emplty");
            List<MSubItem> subItems = subItemRepository.findAll();
            TDailyCleckList dailyCheckList1 = dailyCleckListRepository.save(dailyCheckList);
            for (int i = 0; i < subItems.size(); i++) {
                subItemCheckResultRepository.save(new TSubItemCheckResult(false, subItems.get(i), dailyCheckList1));
            }
        } else {
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

    public List<Items> getALlItems(Date date, Integer branch) {
        List<TDailyCleckList> dailyCheckList = dailyCleckListRepository.findByBranchAndDate(branch, date);
        if (dailyCheckList.isEmpty()) {
            throw new DuplicateEntityException("please enter daily check list");
        } else {
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
}
