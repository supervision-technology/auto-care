/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order;

import com.mac.care_point.service.grn.model.TStockLedger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author L T430
 */
public interface PurchaseOrderStockLedgerRepositoy extends JpaRepository<TStockLedger, Integer> {

    @Query(value = "SELECT\n" +
"if(sum(t_stock_ledger.in_qty)-sum(t_stock_ledger.out_qty) is null ,0,sum(t_stock_ledger.in_qty)-sum(t_stock_ledger.out_qty) )\n" +
"	 as stockQty\n" +
"FROM\n" +
"	t_stock_ledger\n" +
"WHERE\n" +
"	t_stock_ledger.branch=:branch and \n" +
"	t_stock_ledger.item=:item", nativeQuery = true)
    public double getStockQty(@Param("item") Integer item, @Param("branch") Integer branch);

}
