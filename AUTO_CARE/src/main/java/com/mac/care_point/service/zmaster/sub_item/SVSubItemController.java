/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.sub_item;


import com.mac.care_point.service.zmaster.sub_item.model.MSubItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kalum
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/service/zmaster/sub-item")
public class SVSubItemController {

    @Autowired
    private SVSubItemService subItemService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Object[]> getItems() {
        return subItemService.getItems();
    }
    
    @RequestMapping(value = "/all" ,method = RequestMethod.GET)
    public List<MSubItem> getAllSubItem(){
        return subItemService.getAllSubItem();
    }
    
    @RequestMapping(value = "/group-by-item/{item}",method = RequestMethod.GET)
    public List<MSubItem> getSubItemGroupByItem(@PathVariable Integer item){
        return subItemService.getSubItemGroupByItem(item);
    }
            

}
