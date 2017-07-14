/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.master.items.items.model.MItemL;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author kavish manjitha
 */
public interface MItemLRepository extends JpaRepository<MItemL, Integer> {

    public List<MItemL> findByItemCategory(Integer itemCategory);

    @Query(value = "select * \n"
            + "from \n"
            + " m_item \n"
            + "where \n"
            + " name \n"
            + "like \n"
            + " CONCAT('%',:itemKey,'%') \n"
            + "and \n"
            + " m_item.type = \"SERVICE\" \n"
            + "and \n"
            + "price_category = :priceCategory", nativeQuery = true)
    public List<MItemL> getQuickSeacrhItem(@Param("itemKey") String itemKey, @Param("priceCategory") Integer priceCategory);

}
