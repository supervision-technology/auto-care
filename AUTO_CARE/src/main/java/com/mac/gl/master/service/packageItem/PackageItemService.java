/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.packageItem;

import com.mac.gl.master.model.packageItem.MPackageItem;
import com.mac.gl.master.repository.packageItem.PackageItemRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class PackageItemService {
    
    @Autowired
    private PackageItemRepository packageItemRepository;


    public MPackageItem savePackage(MPackageItem packageItem) {
        return packageItemRepository.save(packageItem);
    }

    public void deletePackage(Integer indexNo) {
        packageItemRepository.delete(indexNo);
    }

}
