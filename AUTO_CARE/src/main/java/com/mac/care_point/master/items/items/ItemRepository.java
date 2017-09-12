/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.items;

import com.mac.care_point.master.items.items.model.MItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kavish Manjitha
 */
public interface ItemRepository extends JpaRepository<MItem, Integer> {

    public List<MItem> findByType(String type);

    public List<MItem> findByCategoryAndPriceCategory(Integer category, Integer packageCategory);

    @Query(value = "select \n"
            + " item.index_no, \n"
            + " price_category_details.normal_price,\n"
            + " price_category_details.register_price\n"
            + "from \n"
            + " m_item item\n"
            + "inner join \n"
            + " m_price_category_details price_category_details\n"
            + "on\n"
            + " item.index_no = price_category_details.item\n"
            + "where\n"
            + " item.type = 'SERVICE'\n"
            + "and \n"
            + " item.category = :category \n"
            + "and\n"
            + " price_category_details.price_category = :priceCategory ", nativeQuery = true)
    public List<Object[]> findByCategoryAndPriceCategorys(@Param("category") Integer category,@Param("priceCategory") Integer priceCategory);

    public List<MItem> findByTypeOrType(String stock, String nonStock);

    public List<MItem> findItemByType(String type);
}
