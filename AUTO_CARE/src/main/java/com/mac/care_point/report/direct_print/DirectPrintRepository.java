/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.report.direct_print;

import com.mac.care_point.service.job_item.model.TJobItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author kavish manjitha
 */
public interface DirectPrintRepository extends JpaRepository<TJobItem, Integer> {

    @Query(value = "select \n"
            + "m_item.name as item_name,\n"
            + "t_job_item.price\n"
            + "from \n"
            + " t_job_item \n"
            + "join \n"
            + " t_job_card\n"
            + "on \n"
            + " t_job_card.index_no = t_job_item.job_card\n"
            + "join \n"
            + " m_item\n"
            + "on \n"
            + " m_item.index_no = t_job_item.item\n"
            + "where \n"
            + " t_job_item.job_card = :jobCard \n"
            + "and\n"
            + " t_job_item.item_type = \"SERVICE_ITEM\"", nativeQuery = true)
    public List<Object[]> getServiceItemByJobCard(@Param("jobCard") Integer jobCard);

    @Query(value = "select \n"
            + "m_item.name as item_name,\n"
            + "m_item_units.name as item_unit_name,\n"
            + "t_job_item.price,\n"
            + "t_job_item.quantity,\n"
            + "t_job_item.value\n"
            + "from \n"
            + " t_job_item \n"
            + "join \n"
            + " t_job_card\n"
            + "on \n"
            + " t_job_card.index_no = t_job_item.job_card\n"
            + "join \n"
            + " m_item\n"
            + "on \n"
            + " m_item.index_no = t_job_item.item\n"
            + "join \n"
            + " m_item_units\n"
            + "on \n"
            + " m_item_units.index_no = t_job_item.item_unit\n"
            + "where \n"
            + " t_job_item.job_card = :jobCard \n"
            + "and\n"
            + " t_job_item.item_type = \"STOCK_ITEM\"", nativeQuery = true)
    public List<Object[]> getStockItemByJobCard(@Param("jobCard") Integer jobCard);

    @Query(value = "select \n"
            + " t_job_item.item_type,\n"
            + " sum(value) \n"
            + "from \n"
            + " t_job_item \n"
            + "where \n"
            + " t_job_item.job_card = :jobCard \n"
            + "group by \n"
            + " t_job_item.item_type;", nativeQuery = true)
    public List<Object[]> getItemTotalPriceByJobCard(@Param("jobCard") Integer jobCard);

}
