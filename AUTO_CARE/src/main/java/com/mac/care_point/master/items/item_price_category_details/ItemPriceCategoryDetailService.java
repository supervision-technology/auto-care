/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_price_category_details;

import com.mac.care_point.master.items.item_price_category_details.model.MPriceCategoryDetails;
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
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class ItemPriceCategoryDetailService {

    @Autowired
    private ItemPriceCategoryDetailRepository categoryDetailRepository;

    public List<MPriceCategoryDetails> findByItem(Integer item) {
        return categoryDetailRepository.findByItem(item);
    }

    public MPriceCategoryDetails saveMPriceCategoryDetails(MPriceCategoryDetails mPriceCategoryDetails) {
        return categoryDetailRepository.save(mPriceCategoryDetails);
    }

    public Integer deleteMPriceCategoryDetails(Integer indexNo) {
        categoryDetailRepository.delete(indexNo);
        return indexNo;
    }
}
