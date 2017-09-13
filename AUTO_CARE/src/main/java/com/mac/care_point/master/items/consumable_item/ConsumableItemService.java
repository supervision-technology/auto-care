/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.consumable_item;

import com.mac.care_point.master.items.consumable_item.model.RConsumable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author L T430
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ConsumableItemService {

    @Autowired
    private ConsumableItemRepository consumableItemRepository;

    List<RConsumable> getAll() {
        return consumableItemRepository.findAll();
    }

    RConsumable saveConsumable(RConsumable consumable) {
        Integer number = consumable.getIndexNo();
        RConsumable rConsumable = new RConsumable();
        if (null == number) {
            List<RConsumable> list = consumableItemRepository.findByServiceAndConsumable(consumable.getService(), consumable.getConsumable());
            if (list.isEmpty()) {
                rConsumable = consumableItemRepository.save(consumable);
            } else {
                RConsumable createConsumable = list.get(0);
                createConsumable.setQty(consumable.getQty());
                rConsumable = consumableItemRepository.save(createConsumable);
            }
        } else {
            rConsumable = consumableItemRepository.save(consumable);
        }
        return rConsumable;
    }

    void deleteConsumable(Integer indexNo) {
        consumableItemRepository.delete(indexNo);
    }
    
}
