select 
       m_re_order_level.index_no,
       m_re_order_level.item,
       m_re_order_level.re_order_max as max_reorder,
       m_re_order_level.re_order_min as min_reorder,
       m_branch.name as branch ,
       m_branch.index_no as branch_id ,
       m_item.name as item_name,
       m_supplier.name as supplier_name,
       m_supplier.index_no as supplier_id,
       ((SELECT
       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)
       from 
       t_stock_ledger
       where
       t_stock_ledger.branch = m_re_order_level.branch
       and t_stock_ledger.item = m_re_order_level.item) -
       
       (select 
       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)
       from 
       t_job_item,m_item,t_job_card
       where 
       t_job_card.index_no = t_job_item.job_card and
       t_job_item.order_status = "PENDING" and t_job_item.item_type = "STOCK_ITEM"  and t_job_item.item = m_item.index_no 
       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)) as net_stock_qty,
       
       if(
		 
		 if(
		 (m_re_order_level.re_order_min-((SELECT
       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)
       from 
       t_stock_ledger
       where
       t_stock_ledger.branch = m_re_order_level.branch
       and t_stock_ledger.item = m_re_order_level.item) -
       
       (select 
       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)
       from 
       t_job_item,m_item,t_job_card
       where 
       t_job_card.index_no = t_job_item.job_card and
       t_job_item.order_status = "PENDING" and t_job_item.item_type = "STOCK_ITEM"  and t_job_item.item = m_item.index_no 
       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))<=0.0,0.0,(m_re_order_level.re_order_min-((SELECT
       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)
       from 
       t_stock_ledger
       where
       t_stock_ledger.branch = m_re_order_level.branch
       and t_stock_ledger.item = m_re_order_level.item) -
       
       (select
       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)
       from 
       t_job_item,m_item,t_job_card
       where 
       t_job_card.index_no = t_job_item.job_card and
       t_job_item.order_status = "PENDING" and t_job_item.item_type = "STOCK_ITEM"  and t_job_item.item = m_item.index_no 
       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))
		 )<=0.0,0.0,m_re_order_level.re_order_max-((SELECT
       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)
       from t_stock_ledger where
       t_stock_ledger.branch = m_re_order_level.branch
       and t_stock_ledger.item = m_re_order_level.item) - (select 
       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)
       from 
       t_job_item,m_item,t_job_card
       where 
       t_job_card.index_no = t_job_item.job_card and
       t_job_item.order_status = "PENDING" and t_job_item.item_type = "STOCK_ITEM"  and t_job_item.item = m_item.index_no 
       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))
        as order_qty	,(SELECT sum(if(
		 if(
		 (m_re_order_level.re_order_min-((SELECT
       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)
       from  t_stock_ledger  where
       t_stock_ledger.branch = m_re_order_level.branch
       and t_stock_ledger.item = m_re_order_level.item) -
       (select 
       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)
       from 
       t_job_item,m_item,t_job_card
       where 
       t_job_card.index_no = t_job_item.job_card and
       t_job_item.order_status = "PENDING" and t_job_item.item_type = "STOCK_ITEM"  and t_job_item.item = m_item.index_no 
       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))<=0.0,0.0,(m_re_order_level.re_order_min-((SELECT
       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)
       from t_stock_ledger where
       t_stock_ledger.branch = m_re_order_level.branch
       and t_stock_ledger.item = m_re_order_level.item) -
       (select
       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)
       from 
       t_job_item,m_item,t_job_card
       where 
       t_job_card.index_no = t_job_item.job_card and
       t_job_item.order_status = "PENDING" and t_job_item.item_type = "STOCK_ITEM"  and t_job_item.item = m_item.index_no 
       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch)))
		 )<=0.0,0.0,m_re_order_level.re_order_max-((SELECT
       ifnull(sum(t_stock_ledger.in_qty-t_stock_ledger.out_qty), 0.0)  from 
       t_stock_ledger   where
       t_stock_ledger.branch = m_re_order_level.branch
       and t_stock_ledger.item = m_re_order_level.item) - (select 
       ifnull(sum(t_job_item.stock_remove_qty) ,0.0)
       from 
       t_job_item,m_item,t_job_card
       where 
       t_job_card.index_no = t_job_item.job_card and
       t_job_item.order_status = "PENDING" and t_job_item.item_type = "STOCK_ITEM"  and t_job_item.item = m_item.index_no 
       and t_job_item.item=m_re_order_level.item and t_job_card.branch=m_re_order_level.branch))
		 ))
		 from m_re_order_level
		 where m_re_order_level.item=m_item.index_no )
		   as total_order,
		   m_branch.color as branch_color,
		   (select
 if ((ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = (select m_branch.index_no from m_branch where m_branch.`type`='MAIN_BRANCH') and t_stock_ledger.item = m_item.index_no), 0.0)
-ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item where t_job_item.order_status = "PENDING" and t_job_item.item_type = "STOCK_ITEM"  and t_job_item.item = m_item.index_no), 0.0) )
-(select ifnull(m_re_order_level.re_order_min,0.0) FROM	m_re_order_level where	m_re_order_level.branch=(select m_branch.index_no from m_branch where m_branch.`type`='MAIN_BRANCH')	and m_re_order_level.item=m_item.index_no )<=0,0.00,
(ifnull((select sum(t_stock_ledger.in_qty) - sum(t_stock_ledger.out_qty) from t_stock_ledger where t_stock_ledger.branch = (select m_branch.index_no from m_branch where m_branch.`type`='MAIN_BRANCH') and t_stock_ledger.item = m_item.index_no), 0.0) 
-ifnull((select sum(t_job_item.stock_remove_qty) from t_job_item where t_job_item.order_status = "PENDING" and t_job_item.item_type = "STOCK_ITEM"  and t_job_item.item = m_item.index_no), 0.0) )
-(select	ifnull(m_re_order_level.re_order_min,0.0) FROM	m_re_order_level where	m_re_order_level.branch=(select m_branch.index_no from m_branch where m_branch.`type`='MAIN_BRANCH')	and m_re_order_level.item=m_item.index_no)
) as stock_qty 
from m_item 
where 
m_item.index_no  = m_re_order_level.item 
group by m_item.index_no) as available_qty,
(select 
IFNULL(sum(t_purchase_order_detail.balance_qty),0) as purchasing_qty from
 t_purchase_order_detail where 
 t_purchase_order_detail.item=m_re_order_level.item) as purchasing_qty
from 
       m_re_order_level
       left JOIN m_branch on m_branch.index_no =m_re_order_level.branch
       left JOIN m_item on m_item.index_no=m_re_order_level.item
       left JOIN m_supplier on m_supplier.index_no=m_item.supplier 