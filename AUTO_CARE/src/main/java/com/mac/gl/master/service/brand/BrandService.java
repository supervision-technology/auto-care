/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.brand;

import com.mac.gl.master.model.brand.MBrand;
import com.mac.gl.master.repository.brand.BrandRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class BrandService {

    @Autowired
    BrandRepository brandRepository;

    public List<MBrand> findAllBrand() {
        return brandRepository.findAll();
    }

    private MBrand findByName(String name) {
        List<MBrand> brandList = brandRepository.findByName(name);
        if (brandList.isEmpty()) {
            return null;
        }
        return brandList.get(0);
    }

    public MBrand saveBrand(MBrand mBrand) {
        MBrand findByName = findByName(mBrand.getName());
        if (findByName == null) {
            return brandRepository.save(mBrand);
        }else{
            if (findByName.getIndexNo().equals(mBrand.getIndexNo())) {
                return mBrand;
            }
            throw new DuplicateEntityException("Duplicate name" );
        }
    }

    public void deleteBrand(Integer indexNo) {
        brandRepository.delete(indexNo);
    }

}
