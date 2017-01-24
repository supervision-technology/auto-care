/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.service.subItem;

import com.mac.care_point.master.model.item.MSubItem;
import com.mac.care_point.master.repository.subItem.SubItemRepositery;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SubItemService {

    @Autowired
    private SubItemRepositery subItemRepositery;

    public List<MSubItem> findAllSubCategory() {
        return subItemRepositery.findAll();
    }

    public MSubItem saveSubItem(MSubItem subItem) {
        return subItemRepositery.save(subItem);
    }

    public void deleteSubItem(Integer indexNo) {
        subItemRepositery.delete(indexNo);
    }

    public List<MSubItem> findByItem(MSubItem subItem) {
        return null;
    }

}
