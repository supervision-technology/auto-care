/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.customer_satisfaction;

import com.mac.care_point.service.customer_satisfaction.model.CustomerSatisfaction;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author L T430
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/customer-satisfaction")
public class CustomerSatisfactionController {
    
    @Autowired
    public CustomerSatisfactionService customerSatisfactionService;
            
     @RequestMapping(value = "/save-customer-satisfaction", method = RequestMethod.POST)
    public Integer save(@RequestBody CustomerSatisfaction customerSatisfaction) {
        return customerSatisfactionService.save(customerSatisfaction);
    }
    @RequestMapping(value = "/get-finished-job-cards", method = RequestMethod.GET)
    public List<CustomerSatisfaction> getFinishedJobCard() {
        return customerSatisfactionService.getFinishedJobCard();
    }
}
