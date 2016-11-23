/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.priceCategory;

import com.mac.gl.master.model.priceCategory.PriceCategory;
import com.mac.gl.master.service.priceCategory.PriceCategoryService;
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
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/priceCategory")
public class PriceCategoryController {
    
     @Autowired
    private PriceCategoryService priceCategoryService;

    @RequestMapping(method = RequestMethod.GET)
    public List<PriceCategory> findAll() {
        return priceCategoryService.findAll();
    }

    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public PriceCategory insertPriceCategory(@RequestBody PriceCategory priceCategory) {
        return priceCategoryService.saveDetail(priceCategory);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deletepriceCategory(@PathVariable Integer indexNo) {
         return priceCategoryService.deleteDetail(indexNo);

        
         
    }
}
