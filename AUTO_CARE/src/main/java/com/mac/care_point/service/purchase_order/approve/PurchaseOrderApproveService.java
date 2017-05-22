/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order.approve;

import com.mac.care_point.service.purchase_order.PurchaseOrderRepository;
import com.mac.care_point.service.purchase_order.model.TPurchaseOrder;
import com.mac.care_point.service.purchase_order.model.TPurchaseOrderDetail;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author L T430
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class PurchaseOrderApproveService {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    List<TPurchaseOrder> getPendingPurchaseOrders(Integer branch, String status) {
        return purchaseOrderRepository.findByBranchAndStatusAndIsView(branch, status,true);
    }

    TPurchaseOrder savePurchaseOrderApprove(TPurchaseOrder purchaseOrder, String status) {

        for (TPurchaseOrderDetail detail : purchaseOrder.getPurchaseOrderItemList()) {
            detail.setPurchaseOrder(purchaseOrder);
            detail.setOrderQty(detail.getQty());
            detail.setBalanceQty(detail.getQty());
            detail.setReceiveQty(new BigDecimal(0));
            detail.setStatus(status);
        }
        return purchaseOrderRepository.save(purchaseOrder);
    }

    Integer deletePurchaseOrder(Integer indexNo) {
        TPurchaseOrder purchaseOrder = purchaseOrderRepository.getOne(indexNo);
        purchaseOrder.setIsView(Boolean.FALSE);
        purchaseOrderRepository.save(purchaseOrder);
        return indexNo;
    }

}
