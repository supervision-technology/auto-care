/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.bay;

import com.mac.care_point.master.bay.model.Bay;
import com.mac.care_point.master.bay.BayRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class BayService {
    
     @Autowired
    private BayRepository repository;

    public List<Bay> findAll() {
        return repository.findAll();
    }
     public Bay findByName(String name) {
        List<Bay> departmentList = repository.findByName(name);
        if (departmentList.isEmpty()) {
            return null;
        }
        return departmentList.get(0);
    }

    public Bay saveBay(Bay model) {
        Bay findByName = findByName(model.getName());

        if (findByName == null || findByName.getIndexNo().equals(model.getIndexNo())) {//is'nt already exsist by name
        System.out.println("bay service");
            return repository.save(model);
        } else {//is already exsist by name  
            throw new RuntimeException("duplicate");
        }
    }

    public void deleteBay(Integer indexNo) {
        repository.delete(indexNo);
    }

    List<Bay> findByBranchAndBayIsView(Integer branch, Integer isView) {
        return repository.findByBranchAndBayIsView(branch,isView);
    }

    List<Bay> findByBranchAndEmployeeIsView(Integer branch, Integer isView) {
         return repository.findByBranchAndEmployeeIsView(branch,isView);
    }
    
}
