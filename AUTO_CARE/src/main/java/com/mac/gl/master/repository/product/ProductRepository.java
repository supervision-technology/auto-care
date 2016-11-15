/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.product;

import com.mac.gl.master.model.product.MProduct;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface ProductRepository extends JpaRepository<MProduct, Integer> {

    public List<MProduct> findByName(String name);

    public List<MProduct> findByNameAndIndexNoNot(String name, Integer indexNo);
}
