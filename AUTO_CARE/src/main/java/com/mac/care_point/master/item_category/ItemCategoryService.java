/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.item_category;

import com.mac.care_point.master.item_category.model.MItemCategory;
import com.mac.care_point.system.exception.DuplicateEntityException;
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
public class ItemCategoryService {

    @Autowired
    private ItemCategoryRepository categoryRepository;

    public List<MItemCategory> findAllCategory() {
        return categoryRepository.findAll();
    }

    private MItemCategory findByName(String name) {
        List<MItemCategory> categoryList = categoryRepository.findByName(name);
        if (categoryList.isEmpty()) {
            return null;
        }
        return categoryList.get(0);
    }

    public MItemCategory saveCategory(MItemCategory category) {
        MItemCategory findByName = findByName(category.getName());
        if (findByName==null) {
            return categoryRepository.save(category);
        }else{
            if (findByName.getIndexNo().equals(category.getIndexNo())) {
                return category;
            }
            throw new DuplicateEntityException("Duplicate Name");
        }
        
    }

    public void deleteCategory(Integer indexNo) {
        try {
        categoryRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this category because there are details in other transaction");
        }
    }
}
