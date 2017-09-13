/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.package_item;

import com.mac.care_point.master.items.items.model.MItem;
import com.mac.care_point.master.items.package_item.model.MPackageItem;
import com.mac.care_point.master.items.items.ItemRepository;
import com.mac.care_point.master.items.items.ItemService;
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

    @RequestMapping(value = "/get-package-items/{indexNo}", method = RequestMethod.GET)
    public List<MPackageItem> findByItemGetPackageItem(@PathVariable Integer indexNo) {
        return packageItemService.findByPackages(indexNo);
    }

    @RequestMapping(value = "/save-package", method = RequestMethod.POST)
    public MPackageItem savePackage(@RequestBody MPackageItem packItem) {
        return packageItemService.savePackage(packItem);
    }

    @RequestMapping(value = "/delete-package/{indexNo}", method = RequestMethod.DELETE)
    public Integer deletPackage(@PathVariable Integer indexNo) {
        packageItemService.deletePackage(indexNo);
        return indexNo;
    }
}
