/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_price_category_details;

import com.mac.care_point.master.items.item_price_category_details.model.MPriceCategoryDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kavish manjitha
 */
public interface ItemPriceCategoryDetailRepository extends JpaRepository<MPriceCategoryDetails, Integer>{

    public List<MPriceCategoryDetails> findByItem(Integer item);
    
}
