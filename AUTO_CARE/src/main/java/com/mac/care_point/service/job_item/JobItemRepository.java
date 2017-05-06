/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.service.job_item.model.TJobItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kavish Manjitha
 */
public interface JobItemRepository extends JpaRepository<TJobItem, Integer> {

    public List<TJobItem> findByJobCard(Integer jobCardIndexNo);

    @Query(value = "select\n"
            + "	m_item.index_no,\n"
            + "	ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = :branch and t_stock_ledger.item = m_item.index_no), 0.0) as stock,\n"
            + "	ifnull((select sum(t_job_item.quantity) from t_job_item where t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no), 0.0) as pending\n"
            + "from\n"
            + "	m_item\n"
            + "where \n"
            + "   m_item.index_no = :item", nativeQuery = true)
    public Object[] getItemQtyByStockLeger(@Param("item") Integer item, @Param("branch") Integer branch);
}
