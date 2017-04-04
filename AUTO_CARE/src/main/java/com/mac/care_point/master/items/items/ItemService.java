/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.items;

import com.mac.care_point.master.items.items.model.MItem;
import com.mac.care_point.system.exception.DuplicateEntityException;
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

    public MItem findByNameAndType(String name, String type) {
        List<MItem> nameAndTypeList = itemRepository.findByNameAndType(name, type);
        if (nameAndTypeList.isEmpty()) {
            return null;
        }
        return nameAndTypeList.get(0);
    }

    public List<MItem> findAllItems() {
        return itemRepository.findAll();
    }

    public MItem saveItem(MItem item) {
        MItem item1 = findByNameAndType(item.getName(), item.getType());
        if (item1 == null) {
            return itemRepository.save(item);
        } else {
            if (item1.getName().equals(item.getName())) {
                return itemRepository.save(item);
            }
            throw new DuplicateEntityException("This Item existing");
        }
    }

    public void deleteItem(Integer indexNo) {
        try {
            itemRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("cannot delete this item because there are details in other transaction");
        }
    }
}
