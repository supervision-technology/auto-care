/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.customer_satisfaction;

import com.mac.care_point.service.customer_satisfaction.model.CustomerSatisfaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author L T430
 */
public interface CustomerSatisfactionRepository extends JpaRepository<CustomerSatisfaction, Integer> {

    public List<CustomerSatisfaction> findByDefaultFinalCheckAndInvoiceAndRateAndRateReasonAndStatus(boolean b, boolean b0, int i, String reason,String ststus);

}
