/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.item;

import com.mac.care_point.service.zmaster.item.model.MItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/service/item")
public class ServiceItemController {

    @Autowired
    private ServiceItemService itemService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MItem> getAllItems() {
        return itemService.getAllItems();
    }

}
