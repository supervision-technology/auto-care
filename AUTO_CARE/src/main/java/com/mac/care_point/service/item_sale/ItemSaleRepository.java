/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.item_sale;

import com.mac.care_point.service.invoice.invoice.model.TCustomerLedger;
import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author my
 */
public interface ItemSaleRepository extends JpaRepository<TCustomerLedger, Integer>{
    
}
