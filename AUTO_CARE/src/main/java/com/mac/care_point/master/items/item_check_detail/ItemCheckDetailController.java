/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_check_detail;

import com.mac.care_point.master.items.item_check_detail.model.MItemCheckDetail;
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
@RequestMapping("/api/care-point/master/item-check-detail")
public class ItemCheckDetailController {

    @Autowired
    private ItemCheckDetailService itemCheckDetailService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MItemCheckDetail> getAll() {
        return itemCheckDetailService.getAll();
    }

    @RequestMapping(value = "/save-item-check-detail", method = RequestMethod.POST)
    public MItemCheckDetail saveItemCheckDetail(@RequestBody MItemCheckDetail itemCheckDetail) {
        return itemCheckDetailService.saveItemCheckDetail(itemCheckDetail);
    }
    
    @RequestMapping(value = "/delete-item-check-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteItenCheckDetail(@PathVariable Integer indexNo) {
        itemCheckDetailService.deleteItemCheckDetail(indexNo);
        return indexNo;
    }

}
