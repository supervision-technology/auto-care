/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.service.itemUnit;

import com.mac.care_point.master.model.item.MItem;
import com.mac.care_point.master.model.itemUnit.MItemUnit;
import com.mac.care_point.master.repository.item.ItemRepository;
import com.mac.care_point.master.repository.itemUnit.ItemUnitRepository;
import com.mac.care_point.master.service.item.ItemService;
import java.sql.Array;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ItemUnitService {

    @Autowired
    private ItemUnitRepository itemUnitRepository;

    public List<MItemUnit> getAllItemUnits() {
        return itemUnitRepository.findAll();
    }

    public MItemUnit saveItemUnits(MItemUnit unit) {
        return itemUnitRepository.save(unit);
    }

    public void deleteItemUnits(Integer indexNo) {
        System.out.println(indexNo + "repository");
        itemUnitRepository.delete(indexNo);
    }

    public List<MItemUnit> findByItem(Integer indexNo) {
        List<MItemUnit> list = itemUnitRepository.findByItemIndexNo(indexNo);
        return list;
    }

}
