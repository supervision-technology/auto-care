/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.brand;

import com.mac.care_point.master.brand.model.MBrand;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kalum
 */
public interface BrandRepository extends JpaRepository<MBrand, Serializable>{

    public List<MBrand> findByName(String name);
    
}
