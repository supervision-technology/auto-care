/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.packageItem;

import com.mac.care_point.master.packageItem.model.MPackageItem;
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
        MPackageItem item = findByItemIndexNoAndPackagesIndexNo(packageItem.getItem().getIndexNo(), packageItem.getPackages().getIndexNo());
        if (item == null) {
            return packageItemRepository.save(packageItem);
        }
        if (item.getIndexNo().equals(packageItem.getIndexNo())) {
            return packageItem;
            
        }
        throw new RuntimeException("Your Saved is Duplicated ! ");
    }

    public List<MPackageItem> findAll() {
        return packageItemRepository.findAll();
    }

    public void deletePackage(Integer indexNo) {
        packageItemRepository.delete(indexNo);
    }

    private MPackageItem findByItemIndexNoAndPackagesIndexNo(Integer item, Integer packages) {
        List<MPackageItem> list = packageItemRepository.findByItemIndexNoAndPackagesIndexNo(item, packages);
        if (list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }

}
