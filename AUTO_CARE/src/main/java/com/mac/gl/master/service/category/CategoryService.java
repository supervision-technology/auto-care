/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.category;

import com.mac.gl.master.model.category.MCategory;
import com.mac.gl.master.model.itemdepartment.MItemDepartment;
import com.mac.gl.master.repository.category.CategoryRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<MCategory> findAllCategory() {
        return categoryRepository.findAll();
    }

    public MCategory findByName(String name) {
        List<MCategory> categorys = categoryRepository.findByName(name);
        if (categorys.isEmpty()) {
            return null;
        }
        return categorys.get(0);
    }

    public MCategory saveCategory(MCategory category) {
        MCategory mCategory = findByName(category.getName());
        if (mCategory == null) {
            return categoryRepository.save(category);
        } else {
            if (mCategory.getIndexNo().equals(category.getIndexNo())) {//is update get update Object?
                return category;
            }
            throw new DuplicateEntityException("Category already exists");
        }
    }

    public void deleteCategory(Integer indexNo) {
        categoryRepository.delete(indexNo);
    }

    public List<MCategory> findByItemDepartment(MItemDepartment itemDepartment) {
        return categoryRepository.findByDepartment(itemDepartment);
    }
}
