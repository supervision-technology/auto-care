/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.service.item;

import com.mac.care_point.master.model.item.MItem;
import com.mac.care_point.master.repository.item.ItemRepository;
import com.mac.care_point.system.exception.DuplicateEntityException;
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
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    private String type = "PACKAGE";

    public List<MItem> getAllItem() {
        return itemRepository.findAll();
    }

    public List<MItem> findByName(String name) {
        return itemRepository.findByName(name);
    }

    public List<MItem> findByType() {
        return itemRepository.findByType(type);
    }

    public MItem saveItem(MItem item) {
        List<MItem> findByName = findByName(item.getName());
        if (findByName.isEmpty()) {
            return itemRepository.save(item);
        }
        else if (findByName.get(0).getIndexNo().equals(item.getIndexNo())) {
            System.out.println("duplicate");
            return itemRepository.save(item);
        }
        throw new DuplicateEntityException("This Item is Already Exists !");
    }

    public void deleteItem(Integer indexNo) {
        try {
        itemRepository.delete(indexNo);
        } catch (Exception e) {
            throw  new RuntimeException("Cannot delete this Item because there are details in other transaction");
        }
    }

}
