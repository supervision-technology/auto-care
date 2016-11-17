/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.subCategory;

import com.mac.gl.master.model.category.MCategory;
import com.mac.gl.master.model.subCategory.MSubCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kalum
 */
public interface SubCategoryRepository extends JpaRepository<MSubCategory, Integer> {
}
