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

    public MSubCategory findByname(String name) {
        List<MSubCategory> subCategoryList = subCategoryRepository.findByName(name);

        if (subCategoryList.isEmpty()) {
            return null;
        }
        return subCategoryList.get(0);
    }

    public MSubCategory saveSubCategory(MSubCategory subCategory) {
        MSubCategory findName = findByname(subCategory.getName());
        if (findName == null) {
            return subCategoryRepository.save(subCategory);
        } else {
            if (findName.getIndexNo().equals(subCategory.getIndexNo())) {
                return subCategory;
            }
            throw new DuplicateEntityException("Duplicate name");
        }
    }

    public void deleteSubCategory(Integer indexNo) {
        try {
            subCategoryRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this sub category because there are details in other transaction");
        }
    }

    public List<MSubCategory> findByCategory(MCategory category) {
        return null;
    }
}
