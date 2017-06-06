/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.final_check_list;

import com.mac.care_point.service.final_check_list.model.MItemCheckDetail;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kavish manjitha
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/care-point/master/item-check-details")
public class MItemCheckDetailController {

    @Autowired
    private MItemCheckDetailService itemCheckDetailService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MItemCheckDetail> findByItem() {
        return itemCheckDetailService.findAll();
    }
    
    @RequestMapping(value = "/find-by-item/{item}", method = RequestMethod.GET)
    public List<MItemCheckDetail> findByItem(@PathVariable Integer item) {
        return itemCheckDetailService.findByItem(item);
    }
}
