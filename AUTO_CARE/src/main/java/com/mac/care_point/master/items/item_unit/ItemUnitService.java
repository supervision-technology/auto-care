/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_unit;

import com.mac.care_point.master.items.item_unit.model.MItemUnits;
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
public class ItemUnitService {

    @Autowired
    private ItemUnitRepository itemUnitRepository;

    public List<MItemUnits> getAllItemUnits() {
        return itemUnitRepository.findAll();
    }

    public MItemUnits saveItemUnits(MItemUnits unit) {
        return itemUnitRepository.save(unit);
    }

    public void deleteItemUnits(Integer indexNo) {
        itemUnitRepository.delete(indexNo);
    }

}
