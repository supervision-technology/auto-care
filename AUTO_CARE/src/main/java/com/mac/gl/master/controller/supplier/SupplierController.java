/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.supplier;

import com.mac.gl.master.model.supplier.MSupplier;
import com.mac.gl.master.service.supplier.SupplierService;
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
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @RequestMapping(method = RequestMethod.GET)

    public List<MSupplier> getAllSupplier() {
        return supplierService.getAllSupplier(1);
    }

    @RequestMapping(value = "/save-supplier", method = RequestMethod.POST)
    public MSupplier saveSupplier(@RequestBody MSupplier supplier) {
        return supplierService.saveSupplier(supplier);
    }

    @RequestMapping(value = "/delete-supplier/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteSupplier(@PathVariable Integer indexNo) {
        supplierService.deleteSupplier(indexNo);
        return indexNo;
    }

}
