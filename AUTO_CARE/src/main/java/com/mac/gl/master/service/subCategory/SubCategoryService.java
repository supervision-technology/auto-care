/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.subCategory;

import com.mac.gl.master.model.category.MCategory;
import com.mac.gl.master.model.subCategory.MSubCategory;
import com.mac.gl.master.repository.subCategory.SubCategoryRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SubCategoryService {

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    public List<MSubCategory> findAllSubCategory() {
        return subCategoryRepository.findAll();
    }
    
    private MSubCategory findByNameAndCategoryIndexNo(String category, Integer categoryId){
        List<MSubCategory>subCategoryList = subCategoryRepository.findByNameAndCategoryIndexNo(category, categoryId);
        if (subCategoryList.isEmpty()) {
            return null;
        }

        return subCategoryList.get(0);
    }

    public MSubCategory saveSubCategory(MSubCategory subCategory) {
        
        MSubCategory findByObect = findByNameAndCategoryIndexNo(subCategory.getName(),subCategory.getCategory().getIndexNo());
        if (findByObect!=null) {
            throw new DuplicateEntityException("Sub Category already exist !!!");
        }
        return subCategoryRepository.save(subCategory);
    }

    public void deleteSubCategory(Integer indexNo) {
        subCategoryRepository.delete(indexNo);
    }

    public List<MSubCategory> findByCategory(MCategory category) {
        return subCategoryRepository.findByCategory(category);
    }

}
