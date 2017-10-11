/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.item_sale;

import com.mac.care_point.service.item_sale.model.ItemSaleModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author my
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/item-sale")
public class ItemSaleController {
    
    
    @Autowired
    private ItemSaleService itemSaleService;
    
    @RequestMapping(value = "/save-item-sale", method = RequestMethod.POST)
    public Integer saveItemSale(@RequestBody ItemSaleModel itemSaleModel){
        return itemSaleService.saveItemSale(itemSaleModel);
    }
    
}
