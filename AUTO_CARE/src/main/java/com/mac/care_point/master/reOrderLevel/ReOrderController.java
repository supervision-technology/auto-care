/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.reOrderLevel;

import com.mac.care_point.master.items.items.model.MItem;
import com.mac.care_point.master.reOrderLevel.model.MReOrderLevel;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/api/care-point/master/reOrderLevel")
public class ReOrderController {

    @Autowired
    private ReOrderService reOrderService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MReOrderLevel> findAllReOrderLevel() {
        return reOrderService.findAll();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer save(@RequestBody MReOrderLevel reOrderLevel) {
        return reOrderService.save(reOrderLevel);
    }
}
