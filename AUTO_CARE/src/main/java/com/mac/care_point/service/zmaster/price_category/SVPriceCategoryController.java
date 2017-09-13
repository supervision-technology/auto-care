/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.price_category;

import com.mac.care_point.service.zmaster.price_category.model.MPriceCategory;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kalum
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/service/zmaster/price-category")
public class SVPriceCategoryController {
    
    @Autowired
    private  SVPriceCategoryService priceCategoryService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MPriceCategory> findAll() {
        return priceCategoryService.findAll();
    }
}
