/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.product;

import com.mac.gl.master.model.product.MProduct;
import com.mac.gl.master.service.product.ProductService;
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
@RequestMapping("/api/green-leaves/master/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MProduct> getAllProduct() {
        return productService.getAllProduct();
    }

    @RequestMapping(value = "/save-product", method = RequestMethod.POST)
    public MProduct saveProduct(@RequestBody MProduct product) {
        product.setBranch(1);
        return productService.saveProduct(product);
    }

    @RequestMapping(value = "/delete-product/{indexNo}", method = RequestMethod.DELETE)
    public Integer deletProduct(@PathVariable Integer indexNo) {
        productService.deleteProduct(indexNo);
        return indexNo;
    }
}
