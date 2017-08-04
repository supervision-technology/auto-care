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

    @Query(value = "select \n"
            + " item.index_no,\n"
            + " price_category_details.normal_price,\n"
            + " price_category_details.register_price\n"
            + "from\n"
            + " m_item item\n"
            + "inner join\n"
            + " m_price_category_details price_category_details\n"
            + "on \n"
            + " item.index_no = price_category_details.item\n"
            + "where\n"
            + " item.name\n"
            + "like\n"
            + " CONCAT('%',:itemKey,'%') \n"
            + "and\n"
            + " item.type = \"SERVICE\"\n"
            + "and \n"
            + " price_category_details.price_category = :priceCategory", nativeQuery = true)
    public List<Object[]> getQuickSeacrhItem(@Param("itemKey") String itemKey, @Param("priceCategory") Integer priceCategory);

    @Query(value = "select \n"
            + " m_item.index_no,\n"
            + "ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = :branch and t_stock_ledger.item = m_item.index_no), 0.0)\n"
            + "- ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item where t_job_item.order_status = \"PENDING\" and \n"
            + "t_job_item.item_type = \"STOCK_ITEM\" \n"
            + " and\n"
            + "t_job_item.item = m_item.index_no), 0.0) as stock_qty,\n"
            + "m_item.name\n"
            + " from\n"
            + "m_item\n"
            + " where\n"
            + "m_item.type = \"STOCK\" and \n"
            + "m_item.name\n"
            + " like\n"
            + "CONCAT('%',:itemKey,'%') \n"
            + " group by\n"
            + "m_item.index_no\n"
            + " having stock_qty > 0", nativeQuery = true)
    public List<Object[]> getQuickSeacrhItemStockItem(@Param("itemKey") String itemKey, @Param("branch") Integer branch);

}
