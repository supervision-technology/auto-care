/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order;

import com.mac.care_point.service.purchase_order.model.TPurchaseOrder;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author L T430
 */
public interface PurchaseOrderRepository extends JpaRepository<TPurchaseOrder, Integer> {

    //find table max munber
    public TPurchaseOrder findFirst1ByOrderByIndexNoDesc();

    //get pending purchase order list
    public List<TPurchaseOrder> findByBranchAndStatus(Integer branch, String status);

    public List<TPurchaseOrder> findByBranchAndStatusAndIsView(Integer branch, String status, boolean b);

    public List<TPurchaseOrder> findByBranchAndStatusAndIsView(Integer branch, String status, int i);

    public TPurchaseOrder findByNumberAndBranchAndIsView(Integer number, Integer branch, boolean b);

    @Query(value = "select\n"
            + "		m_branch.color,\n"
            + "     	m_branch.branch_code,\n"
            + "      m_branch.name,\n"
            + "      ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.item = m_item.index_no and m_branch.index_no=t_stock_ledger.branch), 0.0) as stock,\n"
            + "      ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item,m_item,t_job_card where t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no \n"
            + "		and t_job_item.job_card=t_job_card.index_no and t_job_card.branch=m_branch.index_no), 0.0) as pending\n"
            + "from\n"
            + "      m_item,m_branch\n"
            + "where\n"
            + "      m_item.index_no  =:item\n"
            + "group by\n"
            + "      m_branch.index_no", nativeQuery = true)
    public List<Object[]> getItemQtyByBranches(@Param("item") Integer item);

    @Query(value = "select \n" +
"       m_re_order_level.index_no,\n" +
"       m_re_order_level.item,\n" +
"       m_re_order_level.re_order_max as max_reorder,\n" +
"       m_re_order_level.re_order_min as min_reorder,\n" +
"       m_branch.name as branch ,\n" +
"       m_branch.index_no as branch_id ,\n" +
"       m_item.name as item_name,\n" +
"       m_supplier.name as supplier_name,\n" +
"       m_supplier.index_no as supplier_id,\n" +
"       ((SELECT\n" +
"       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)\n" +
"       from \n" +
"       t_stock_ledger\n" +
"       where\n" +
"       t_stock_ledger.branch = m_re_order_level.branch\n" +
"       and t_stock_ledger.item = m_re_order_level.item) -\n" +
"       \n" +
"       (select \n" +
"       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)\n" +
"       from \n" +
"       t_job_item,m_item,t_job_card\n" +
"       where \n" +
"       t_job_card.index_no = t_job_item.job_card and\n" +
"       t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no \n" +
"       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)) as net_stock_qty,\n" +
"       if(if(\n" +
"		 (m_re_order_level.re_order_min-((SELECT\n" +
"       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)\n" +
"       from \n" +
"       t_stock_ledger\n" +
"       where\n" +
"       t_stock_ledger.branch = m_re_order_level.branch\n" +
"       and t_stock_ledger.item = m_re_order_level.item) -\n" +
"       (select \n" +
"       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)\n" +
"       from \n" +
"       t_job_item,m_item,t_job_card\n" +
"       where \n" +
"       t_job_card.index_no = t_job_item.job_card and\n" +
"       t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no \n" +
"       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))<=0.0,0.0,(m_re_order_level.re_order_min-((SELECT\n" +
"       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)\n" +
"       from \n" +
"       t_stock_ledger\n" +
"       where\n" +
"       t_stock_ledger.branch = m_re_order_level.branch\n" +
"       and t_stock_ledger.item = m_re_order_level.item) - \n" +
"       (select\n" +
"       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)\n" +
"       from \n" +
"       t_job_item,m_item,t_job_card\n" +
"       where \n" +
"       t_job_card.index_no = t_job_item.job_card and\n" +
"       t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no \n" +
"       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))\n" +
"		 )<=0.0,0.0,m_re_order_level.re_order_max-((SELECT\n" +
"       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)\n" +
"       from t_stock_ledger where\n" +
"       t_stock_ledger.branch = m_re_order_level.branch\n" +
"       and t_stock_ledger.item = m_re_order_level.item) - (select \n" +
"       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)\n" +
"       from \n" +
"       t_job_item,m_item,t_job_card\n" +
"       where \n" +
"       t_job_card.index_no = t_job_item.job_card and\n" +
"       t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no \n" +
"       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))\n" +
"        as order_qty	,(SELECT sum(if(\n" +
"		 if(\n" +
"		 (m_re_order_level.re_order_min-((SELECT\n" +
"       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)\n" +
"       from  t_stock_ledger  where\n" +
"       t_stock_ledger.branch = m_re_order_level.branch\n" +
"       and t_stock_ledger.item = m_re_order_level.item) -\n" +
"       (select \n" +
"       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)\n" +
"       from \n" +
"       t_job_item,m_item,t_job_card\n" +
"       where \n" +
"       t_job_card.index_no = t_job_item.job_card and\n" +
"       t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no \n" +
"       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))<=0.0,0.0,(m_re_order_level.re_order_min-((SELECT\n" +
"       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)\n" +
"       from t_stock_ledger where\n" +
"       t_stock_ledger.branch = m_re_order_level.branch\n" +
"       and t_stock_ledger.item = m_re_order_level.item) -\n" +
"       (select\n" +
"       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)\n" +
"       from \n" +
"       t_job_item,m_item,t_job_card\n" +
"       where \n" +
"       t_job_card.index_no = t_job_item.job_card and\n" +
"       t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no \n" +
"       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))\n" +
"		 )<=0.0,0.0,m_re_order_level.re_order_max-((SELECT\n" +
"       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)  from \n" +
"       t_stock_ledger   where\n" +
"       t_stock_ledger.branch = m_re_order_level.branch\n" +
"       and t_stock_ledger.item = m_re_order_level.item) - (select \n" +
"       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)\n" +
"       from \n" +
"       t_job_item,m_item,t_job_card\n" +
"       where \n" +
"       t_job_card.index_no = t_job_item.job_card and\n" +
"       t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no \n" +
"       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch))))\n" +
"		 from m_re_order_level\n" +
"		 where m_re_order_level.item=m_item.index_no )\n" +
"		   as total_order,\n" +
"		   ifnull(m_branch.color,'#ccc') as branch_color,\n" +
"		   ifnull((select\n" +
" if ((ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = (select m_branch.index_no from m_branch where m_branch.`type`='MAIN_BRANCH') and t_stock_ledger.item = m_item.index_no), 0.0)\n" +
"-ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item where t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no), 0.0) )\n" +
"-(select ifnull(m_re_order_level.re_order_min,0.0) FROM	m_re_order_level where	m_re_order_level.branch=(select m_branch.index_no from m_branch where m_branch.`type`='MAIN_BRANCH')	and m_re_order_level.item=m_item.index_no )<=0,0.00,\n" +
"(ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = (select m_branch.index_no from m_branch where m_branch.`type`='MAIN_BRANCH') and t_stock_ledger.item = m_item.index_no), 0.0) \n" +
"-ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item where t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no), 0.0) )\n" +
"-(select	ifnull(m_re_order_level.re_order_min,0.0) FROM	m_re_order_level where	m_re_order_level.branch=(select m_branch.index_no from m_branch where m_branch.`type`='MAIN_BRANCH')	and m_re_order_level.item=m_item.index_no)\n" +
") as stock_qty \n" +
"from m_item \n" +
"where \n" +
"m_item.index_no  = m_re_order_level.item \n" +
"group by m_item.index_no),0.0) as available_qty,\n" +
"(select \n" +
"IFNULL(sum(t_purchase_order_detail.balance_qty),0) as purchasing_qty from\n" +
" t_purchase_order_detail where \n" +
" t_purchase_order_detail.item=m_re_order_level.item) as purchasing_qty\n" +
"from \n" +
"       m_re_order_level\n" +
"       left JOIN m_branch on m_branch.index_no =m_re_order_level.branch\n" +
"       left JOIN m_item on m_item.index_no=m_re_order_level.item\n" +
"       left JOIN m_supplier on m_supplier.index_no=m_item.supplier\n"+
  "          HAVING item_name is not null ", nativeQuery = true)
    public List<Object[]> getOrderRequestItems();
    
    
    @Query(value = "select \n"
            + "ifnull(max(t_stock_transfer.out_number)+1,1 )as next_out_number\n"
            + "from\n"
            + "t_stock_transfer\n"
            + "where t_stock_transfer.from_branch=:fromBranch and t_stock_transfer.`type`=:type", nativeQuery = true)
    public Integer getNextOutNumber(@Param("fromBranch") Integer branch, @Param("type") String type);
    
     @Query(value = "select\n" +
"      if ((ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = :branch and t_stock_ledger.item = m_item.index_no), 0.0) \n" +
"      -ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item where t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no), 0.0) )\n" +
"		-(select ifnull(m_re_order_level.re_order_min,0.0) FROM	m_re_order_level where	m_re_order_level.branch=:branch	and m_re_order_level.item=:item )<=0,0.00,\n" +
"		\n" +
"		(ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = :branch and t_stock_ledger.item = m_item.index_no), 0.0) \n" +
"      -ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item where t_job_item.order_status = \"PENDING\" and t_job_item.item_type = \"STOCK_ITEM\"  and t_job_item.item = m_item.index_no), 0.0) )\n" +
"		-(select	ifnull(m_re_order_level.re_order_min,0.0) FROM	m_re_order_level where	m_re_order_level.branch=:branch	and m_re_order_level.item=:item)\n" +
"		) as stock_qty \n" +
"		from m_item \n" +
"		where \n" +
"		m_item.index_no  = :item \n" +
"		group by m_item.index_no", nativeQuery = true)
    public double getMainBranchAvailableStock(@Param("branch") Integer branch, @Param("item") Integer item);

}
