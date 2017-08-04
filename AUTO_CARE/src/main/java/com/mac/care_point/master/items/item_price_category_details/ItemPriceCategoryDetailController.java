/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_price_category_details;

import com.mac.care_point.master.items.item_price_category_details.model.MPriceCategoryDetails;
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
@RestController
@CrossOrigin
@RequestMapping("/api/care-point/master/price-categiry-details")
public class ItemPriceCategoryDetailController {

    @Autowired
    private ItemPriceCategoryDetailService itemPriceCategoryDetailService;

    @RequestMapping(value = "/find-by-item/{item}", method = RequestMethod.GET)
    public List<MPriceCategoryDetails> findByItem(@PathVariable Integer item) {
        return itemPriceCategoryDetailService.findByItem(item);
    }

    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public MPriceCategoryDetails saveMPriceCategoryDetails(@RequestBody MPriceCategoryDetails mPriceCategoryDetails) {
        return itemPriceCategoryDetailService.saveMPriceCategoryDetails(mPriceCategoryDetails);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteMPriceCategoryDetails(@PathVariable Integer indexNo) {
        return itemPriceCategoryDetailService.deleteMPriceCategoryDetails(indexNo);
    }
}
