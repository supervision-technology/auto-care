/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.itemdepartment;

import com.mac.care_point.master.itemdepartment.model.MItemDepartment;
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
public class ItemDepartmentService {

    @Autowired
    private ItemDepartmentRepository departmentRepository;

    public List<MItemDepartment> findAll() {
        return departmentRepository.findAll();
    }

    private MItemDepartment findByName(String name) {
        List<MItemDepartment> itemList = departmentRepository.findByName(name);
        if (itemList.isEmpty()) {
            return null;
        }
        return itemList.get(0);
    }

    public MItemDepartment saveItemDepartment(MItemDepartment departmentModal) {
        MItemDepartment findByName = findByName(departmentModal.getName());
        if (findByName == null) {
            return departmentRepository.save(departmentModal);
        } else {
            if (findByName.getIndexNo().equals(departmentModal.getIndexNo())) {
                return departmentModal;
            }
            throw new DuplicateEntityException("Duplicate name");
        }
    }

    public void deleteItemDepartment(Integer indexNo) {
        try {
            departmentRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this Item-Department because there are details in other transaction");
        }
    }
}
