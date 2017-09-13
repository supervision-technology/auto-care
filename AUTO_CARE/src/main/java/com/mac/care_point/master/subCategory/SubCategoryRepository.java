/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.subCategory;

import com.mac.care_point.master.subCategory.model.MSubCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author kalum
 */
public interface SubCategoryRepository extends JpaRepository<MSubCategory, Integer> {

    public List<MSubCategory> findByName(String name);

    @Query(value = "select m_sub_category.index_no,m_sub_category.name from m_item join m_sub_category on m_item.sub_category =  m_sub_category.index_no where m_item.`type` = \"STOCK\" and m_item.item_category = :category group by m_sub_category.name", nativeQuery = true)
    public List<Object[]> findSubCubCategoryByCatrory(@Param("category") Integer category);

}
