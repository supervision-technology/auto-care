/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn;

import com.mac.care_point.service.grn.model.TGrn;
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
@RequestMapping("/api/care-point/transaction/grn")
public class GrnController {
    private Integer branch=1;
    
     @Autowired
    private GrnService grnService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<TGrn> getAllGrn() {
        return grnService.getAllGrn();
    }
    @RequestMapping(value = "/grn-payment-history-by-supplier/{supplier}", method = RequestMethod.GET)
    public List<Object[]> getSupplierGrnPaymentHistory(@PathVariable Integer supplier) {
        System.out.println("Controller");
        return grnService.getSupplierGrnPaymentHistory(supplier);
    }
    
    @RequestMapping(value = "/save-grn", method = RequestMethod.POST)
    public Integer saveGrn(@RequestBody TGrn grn) {
         
        System.out.println("grn");
        System.out.println(grn.getAmount());
        System.out.println(grn.getDate());
        System.out.println(grn.getRefNumber());
        System.out.println(grn.getSupplier());
        System.out.println(grn.getDiscount());
        System.out.println(grn.getNetAmount());
        grn.setBranch(branch);
        TGrn saveGrn= grnService.saveGrn(grn);
        return saveGrn.getIndexNo();
    }
}
