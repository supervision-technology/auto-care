/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.priceCategory;

import com.mac.gl.master.model.priceCategory.PriceCategory;
import com.mac.gl.master.repository.priceCategory.PriceCategoryRepository;
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
public class PriceCategoryService {
    
    @Autowired
    private PriceCategoryRepository priceCategoryRepository;
    
     public List<PriceCategory> findAll() {
        return priceCategoryRepository.findAll();
    }

    public PriceCategory saveDetail(PriceCategory priceCategory) {
        return priceCategoryRepository.save(priceCategory);
    }

    public void deleteDetail(Integer indexNo) {
        priceCategoryRepository.delete(indexNo);
    }
}
