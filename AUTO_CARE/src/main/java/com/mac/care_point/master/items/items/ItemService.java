/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.items;

import com.mac.care_point.master.items.items.model.MItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<MItem> findAllItems() {
        return itemRepository.findAll();
    }

    public MItem saveItem(MItem item) {
        return itemRepository.save(item);
    }

    public void deleteItem(Integer indexNo) {
        try {
            itemRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("cannot delete this item because there are details in other transaction");
        }
    }

    public List<MItem> findByCategoryAndPriceCategory(Integer category, Integer packageCategory) {
        return itemRepository.findByCategoryAndPriceCategory(category, packageCategory);
    }

    List<MItem> findItemsByTypeAndBranchAndQty(int BRANCH, String TYPE) {
        return itemRepository.findByBranchAndType(BRANCH,TYPE);
    }

    List<MItem> getSupplierItem(Integer branch,String stock,String nonStock) {
        System.out.println(branch);
        System.out.println(stock);
        System.out.println(nonStock);
        return itemRepository. findByBranchAndTypeOrType(branch,stock,nonStock);
    }
}
