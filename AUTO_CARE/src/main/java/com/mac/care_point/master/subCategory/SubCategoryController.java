/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.subCategory;

import com.mac.care_point.master.category.model.MCategory;
import com.mac.care_point.master.subCategory.model.MSubCategory;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kalum
 */

@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/sub-category")
public class SubCategoryController {

    @Autowired
    private SubCategoryService subCategoryService;
    
    //find all
    @RequestMapping(method = RequestMethod.GET)
    public List<MSubCategory> findAllCategory() {
        return subCategoryService.findAllSubCategory();
    }
    
    @RequestMapping(value = "/find-by-category/{indexNo}",method = RequestMethod.GET)
    public List<Object[]> findByCategory(@PathVariable Integer indexNo) {
        return subCategoryService.findSubCategory(indexNo);
    }

    //Save subCategory
    @RequestMapping(value = "/save-subCategory", method = RequestMethod.POST)
    public MSubCategory saveSubCategory(@RequestBody MSubCategory subCategory) {
        return subCategoryService.saveSubCategory(subCategory);
    }
    //delete subCategory
    @RequestMapping(value = "/delete-sub-category/{indexNo}", method = RequestMethod.DELETE)
    public void deleteSubCategory(@PathVariable Integer indexNo) {
        subCategoryService.deleteSubCategory(indexNo);
    }
    //find by category
    @RequestMapping(value = "/get-sub-category", method = RequestMethod.POST)
    public List<MSubCategory> findByCategory(@RequestBody MCategory category) {
        return subCategoryService.findByCategory(category);
    }
}
