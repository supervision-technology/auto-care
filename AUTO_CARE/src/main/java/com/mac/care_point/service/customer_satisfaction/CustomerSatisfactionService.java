/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.customer_satisfaction;

import com.mac.care_point.service.customer_satisfaction.model.CustomerSatisfaction;
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
public class CustomerSatisfactionService {

    @Autowired
    public CustomerSatisfactionRepository satisfactionRepository;

    Integer save(CustomerSatisfaction customerSatisfaction) {
        CustomerSatisfaction saveModel = satisfactionRepository.findOne(customerSatisfaction.getIndexNo());
        saveModel.setRate(customerSatisfaction.getRate());
        saveModel.setRateReason(customerSatisfaction.getRateReason());
        return satisfactionRepository.save(saveModel).getIndexNo();

    }
    List<CustomerSatisfaction> getFinishedJobCard() {
        return satisfactionRepository.findByDefaultFinalCheckAndInvoiceAndRateAndRateReason(true,true,0,null);
    }
}
