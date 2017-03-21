/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.items;

import com.mac.care_point.master.items.items.model.MItem;
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
 * @author Kavish Manjitha
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    final int BRANCH = 1;

    @RequestMapping(method = RequestMethod.GET)
    public List<MItem> findAllItems() {
        return itemService.findAllItems();
    }

    @RequestMapping(value = "/save-item", method = RequestMethod.POST)
    public MItem saveItem(@RequestBody MItem item) {
        item.setBranch(BRANCH);
        //TODO: set login branch
        return itemService.saveItem(item);
    }

    @RequestMapping(value = "/delete-item/{indexNo}", method = RequestMethod.DELETE)
    public void deletItem(@PathVariable Integer indexNo) {
        itemService.deleteItem(indexNo);
    }
}