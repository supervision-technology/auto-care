/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.package_item;

import com.mac.care_point.master.items.package_item.model.MPackageItem;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface PackageItemRepository extends JpaRepository<MPackageItem, Serializable>{

    public List<MPackageItem> findByPackages(Integer indexNo);
    
}
