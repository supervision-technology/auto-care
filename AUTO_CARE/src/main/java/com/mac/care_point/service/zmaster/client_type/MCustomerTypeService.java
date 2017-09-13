/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.client_type;

import com.mac.care_point.service.zmaster.client_type.model.MCustomerType;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kavish manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class MCustomerTypeService {

    @Autowired
    private MCustomerItemTypeRepository customerItemTypeRepository;

    public List<MCustomerType> findAll() {
        return customerItemTypeRepository.findAll();
    }
}
