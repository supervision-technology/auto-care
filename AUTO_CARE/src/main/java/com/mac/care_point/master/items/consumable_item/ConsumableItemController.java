/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.consumable_item;

import com.mac.care_point.master.items.consumable_item.model.RConsumable;
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
 * @author L T430
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/consumable-item")
public class ConsumableItemController {

    @Autowired
    private ConsumableItemService consumableItemService;

    @RequestMapping(method = RequestMethod.GET)
    public List<RConsumable> getAll() {
        return consumableItemService.getAll();
    }

    @RequestMapping(value = "/save-consumable", method = RequestMethod.POST)
    public RConsumable saveConsumable(@RequestBody RConsumable consumable) {
        return consumableItemService.saveConsumable(consumable);
    }

    @RequestMapping(value = "/delete-consumable/{indexNo}", method = RequestMethod.DELETE)
    public Integer deletConsumable(@PathVariable Integer indexNo) {
        consumableItemService.deleteConsumable(indexNo);
        return indexNo;
    }
}
