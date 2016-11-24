/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.subItem;

import com.mac.gl.master.model.item.MSubItem;
import com.mac.gl.master.service.subItem.SubItemService;
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
@RequestMapping("/api/care-point/master/sub-item")
public class subItemController {
    @Autowired
    SubItemService subItemService;
    
     //find all
    @RequestMapping(method = RequestMethod.GET)
    public List<MSubItem> findAllCategory() {
        return subItemService.findAllSubCategory();
    }

    //Save subCategory
    @RequestMapping(value = "/save-subItem", method = RequestMethod.POST)
    public MSubItem saveSubItem(@RequestBody MSubItem subItem) {
        return subItemService.saveSubItem(subItem);
    }
    //delete subCategory
    @RequestMapping(value = "/delete-subItem/{indexNo}", method = RequestMethod.DELETE)
    public void deleteSubItem(@PathVariable Integer indexNo) {
        subItemService.deleteSubItem(indexNo);
    }
    //find by category
    @RequestMapping(value = "/get-subItem", method = RequestMethod.POST)
    public List<MSubItem> findByItem(@RequestBody MSubItem subItem) {
        return subItemService.findByItem(subItem);
    }
    
}
