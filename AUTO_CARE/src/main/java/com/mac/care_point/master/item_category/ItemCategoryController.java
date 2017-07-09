/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.item_category;

import com.mac.care_point.master.item_category.model.MItemCategory;
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
 * @author kavish manjitha
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/item-category")
public class ItemCategoryController {

    @Autowired
    private ItemCategoryService categoryService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MItemCategory> findAllCategory() {
        return categoryService.findAllCategory();
    }

    @RequestMapping(value = "/save-category", method = RequestMethod.POST)
    public MItemCategory saveCategory(@RequestBody MItemCategory itemCategory) {
        return categoryService.saveCategory(itemCategory);
    }

    @RequestMapping(value = "/delete-category/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteCategory(@PathVariable Integer indexNo) {
        categoryService.deleteCategory(indexNo);
        return indexNo;
    }

}
