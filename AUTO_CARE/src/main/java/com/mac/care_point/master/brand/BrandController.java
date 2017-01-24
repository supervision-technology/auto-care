/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.brand;

import com.mac.care_point.master.brand.model.MBrand;
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
@RequestMapping("/api/care-point/master/brand")

public class BrandController {

    @Autowired
    private BrandService brandService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MBrand> findAllBrand() {
        return brandService.findAllBrand();
    }

    @RequestMapping(value = "/save-brand", method = RequestMethod.POST)
    public MBrand saveBrand(@RequestBody MBrand mBrand){
       return  brandService.saveBrand(mBrand);
    }
    
    @RequestMapping(value = "/delete-brand/{indexNo}",method = RequestMethod.DELETE)
    public Integer deleteBrand(@PathVariable Integer indexNo){
        brandService.deleteBrand(indexNo);
        return indexNo;
    }
}
