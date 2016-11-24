/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.packageItem;

import com.mac.gl.master.model.item.MItem;
import com.mac.gl.master.model.packageItem.MPackageItem;
import com.mac.gl.master.repository.item.ItemRepository;
import com.mac.gl.master.service.item.ItemService;
import com.mac.gl.master.service.packageItem.PackageItemService;
import java.util.ArrayList;
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
 * @author Nidura Prageeth
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/package-item")
public class PackageItemController {

    @Autowired
    private PackageItemService packageItemService;
    
    @Autowired
    private ItemService itemService;


    @RequestMapping(value = "/save-package", method = RequestMethod.POST)
    public MPackageItem savePackage(@RequestBody MPackageItem packageItem) {
        System.out.println(packageItem.getPackages());
        packageItem.getPackages().setUnitList(new ArrayList<>());
        MItem packages = itemService.saveItem(packageItem.getPackages());
        packageItem.setPackages(packages);
//        System.out.println(packageItem); 
        return packageItemService.savePackage(packageItem);
    }

    @RequestMapping(value = "/delete-package/{indexNo}", method = RequestMethod.DELETE)
    public Integer deletPackage(@PathVariable Integer indexNo) {
        packageItemService.deletePackage(indexNo);
        return indexNo;
    }
}
