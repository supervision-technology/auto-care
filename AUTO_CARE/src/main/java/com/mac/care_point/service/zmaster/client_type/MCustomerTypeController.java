/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.client_type;

import com.mac.care_point.service.zmaster.client_type.model.MCustomerType;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kavish manjitha
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/care-point/service/zmaster/customer-type")
public class MCustomerTypeController {

    @Autowired
    private MCustomerTypeService customerTypeService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MCustomerType> findAll() {
        return customerTypeService.findAll();
    }

}
