/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.supplier;

import com.mac.gl.master.model.supplier.MSupplier;
import com.mac.gl.master.repository.supplier.SupplierRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
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
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public List<MSupplier> getAllSupplier(Integer branch) {
        return supplierRepository.findAll();
    }

    public MSupplier saveSupplier(MSupplier supplier) {
        if (isNotDuplicate(supplier)) {
            return supplierRepository.save(supplier);
        } else {
            throw new DuplicateEntityException("supplier already exists");
        }
    }

    public void deleteSupplier(Integer indexNo) {
        supplierRepository.delete(indexNo);
    }

    //validation
    private boolean isNotDuplicate(MSupplier supplier) {
        List<MSupplier> suppliers;
        if (supplier.getIndexNo() == null) {
            suppliers = supplierRepository.findByName(supplier.getName());
        } else {
            suppliers = supplierRepository.findByNameAndIndexNoNot(supplier.getName(), supplier.getIndexNo());
        }
        return suppliers.isEmpty();
    }
}
