/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order;

import com.mac.care_point.service.purchase_order.model.TPurchaseOrder;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author L T430
 */
public interface PurchaseOrderRepository extends JpaRepository<TPurchaseOrder, Integer>{

    //find table max munber
    public TPurchaseOrder findFirst1ByOrderByIndexNoDesc();

    //get pending purchase order list
    public List<TPurchaseOrder> findByBranchAndStatus(Integer branch, String status);

    public List<TPurchaseOrder> findByBranchAndStatusAndIsView(Integer branch, String status, boolean b);

    public List<TPurchaseOrder> findByBranchAndStatusAndIsView(Integer branch, String status, int i);

    public TPurchaseOrder findByNumberAndBranchAndIsView(Integer number, Integer branch,boolean b);

}
