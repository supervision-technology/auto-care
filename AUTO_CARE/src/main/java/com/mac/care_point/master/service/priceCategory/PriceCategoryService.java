/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.service.priceCategory;

import com.mac.care_point.master.model.priceCategory.PriceCategory;
import com.mac.care_point.master.repository.priceCategory.PriceCategoryRepository;
import com.mac.care_point.system.exception.DuplicateEntityException;
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

    private PriceCategory findByPriceCategory(String name) {
        List<PriceCategory> categoryList = priceCategoryRepository.findByName(name);
        if (categoryList.isEmpty()) {
            return null;
        }
        return categoryList.get(0);
    }

    public PriceCategory saveDetail(PriceCategory priceCategory) {
        PriceCategory findByPriceCategory = findByPriceCategory(priceCategory.getName());
        if (findByPriceCategory == null) {
            return priceCategoryRepository.save(priceCategory);
        }else{
            if (findByPriceCategory.getIndexNo().equals(priceCategory.getIndexNo())) {
                return priceCategory;
            }
            throw new DuplicateEntityException("Duplicate name");
        }
    }

    public Integer deleteDetail(Integer indexNo) {
        try {
            priceCategoryRepository.delete(indexNo);

        } catch (Exception e) {
            throw new DuplicateEntityException("Cannot delete this price category because there are details in other transaction");
        }
        return indexNo;
    }
}
