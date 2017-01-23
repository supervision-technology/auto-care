/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.item;

import com.mac.gl.master.model.item.MItem;
import com.mac.gl.master.service.item.ItemService;
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
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/item")
public class ItemController {
    
    @Autowired
    private ItemService itemService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MItem> getAllItem() {
        return itemService.getAllItem();
    }

    @RequestMapping(value = "/all-packages", method = RequestMethod.GET)
    public List<MItem> getAllItemByType() {
        return itemService.findByType();
    }

    @RequestMapping(value = "/save-item", method = RequestMethod.POST)
    public MItem saveItem(@RequestBody MItem item) {
        return itemService.saveItem(item);
    }

    @RequestMapping(value = "/delete-item/{indexNo}", method = RequestMethod.DELETE)
    public void deletItem(@PathVariable Integer indexNo) {
        itemService.deleteItem(indexNo);
    }
}
