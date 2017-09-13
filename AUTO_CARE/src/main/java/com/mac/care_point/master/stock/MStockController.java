/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.stock;

import com.mac.care_point.service.stock.transfer.model.MStore;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author L T430
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/stock")
public class MStockController {

    @Autowired
    private MStockService stockService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MStore> findAllItems() {
        return stockService.findAllItems();
    }
}
