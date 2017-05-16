/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer;

import com.mac.care_point.service.stock.transfer.model.TStockTransfer;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author L T430
 */
public interface TransferRepository extends JpaRepository<TStockTransfer, Integer> {

    public List<TStockTransfer> findByToBranchAndToStoreAndStatus(Integer branch, Integer stock, String pending_status);

    @Query(value = "select\n"
            + "  m_item.index_no,\n"
            + "  ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = :branch and t_stock_ledger.item = m_item.index_no), 0.0) as stock,\n"
            + "  ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item where t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no), 0.0) as pending\n"
            + "from\n"
            + "   m_item\n"
            + "   where\n"
            + "   m_item.type = \"STOCK\"\n"
            + "   and \n"
            + "   m_item.index_no  = :item\n"
            + "   group by\n"
            + "m_item.index_no", nativeQuery = true)
    public List<Object[]> getItemQtyByStock(@Param("branch") Integer branch, @Param("item") Integer item);

    @Query(value = "select\n"
            + "	(sum(t_stock_ledger.avarage_price_in)-sum(t_stock_ledger.avarage_price_out)) /\n"
            + "	(sum(t_stock_ledger.in_qty)-sum(t_stock_ledger.out_qty)) \n"
            + "	 as avarage_price\n"
            + "from\n"
            + "	t_stock_ledger\n"
            + "where t_stock_ledger.item=:item and t_stock_ledger.branch=:branch", nativeQuery = true)
    public BigDecimal getItemAvaragePrice(@Param("branch") Integer branch, @Param("item") Integer item);

    @Query(value = "select\n"
            + "     m_item.index_no,\n"
            + "    ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = :branch and t_stock_ledger.item = m_item.index_no and t_stock_ledger.store=:store), 0.0) as stock,\n"
            + "    ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item where t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no), 0.0) as pending\n"
            + "from\n"
            + "    m_item\n"
            + "where\n"
            + "    m_item.type = \"STOCK\" and m_item.index_no = :item\n"
            + "group by\n"
            + "    m_item.index_no", nativeQuery = true)
    public List<Object[]> getItemQtyByStockWithStock(@Param("branch") Integer branch,@Param("item") Integer item, @Param("store") Integer store);

    @Query(value = "select \n"
            + "ifnull(max(t_stock_transfer.out_number)+1,1 )as next_out_number\n"
            + "from\n"
            + "t_stock_transfer\n"
            + "where t_stock_transfer.from_branch=:fromBranch and t_stock_transfer.`type`=:type", nativeQuery = true)
    public Integer getNextOutNumber(@Param("fromBranch") Integer branch, @Param("type") String type);

    @Query(value = "select \n"
            + "ifnull(max(t_stock_transfer.in_number)+1,1 )as next_in_number\n"
            + "from\n"
            + "t_stock_transfer\n"
            + "where t_stock_transfer.from_branch=:fromBranch and t_stock_transfer.`type`=:type", nativeQuery = true)
    public Integer getNextInNumber(@Param("fromBranch") Integer branch, @Param("type") String type);

}
