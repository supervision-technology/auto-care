/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order.request;

import com.mac.care_point.service.purchase_order.PurchaseOrderRepository;
import com.mac.care_point.service.purchase_order.PurchaseOrderStockLedgerRepositoy;
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
public class PurchaseOrderService {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private PurchaseOrderStockLedgerRepositoy stockLedgerRepositoy;

    @Transactional
    TPurchaseOrder savePurchaseOrder(TPurchaseOrder purchaseOrder,String status) {

        TPurchaseOrder findLastRow = purchaseOrderRepository.findFirst1ByOrderByIndexNoDesc();

        if (findLastRow != null) {
            purchaseOrder.setNumber(findLastRow.getNumber() + 1);
        } else {
            purchaseOrder.setNumber(1);
        }

        for (TPurchaseOrderDetail detail : purchaseOrder.getPurchaseOrderItemList()) {
            detail.setPurchaseOrder(purchaseOrder);
            detail.setOrderQty(detail.getQty());
            detail.setBalanceQty(detail.getQty());
            detail.setReceiveQty(new BigDecimal(0));
            detail.setStatus(status);
        }
        return purchaseOrderRepository.save(purchaseOrder);
    }

    public double getStockQty(Integer item, Integer branch) {
        return stockLedgerRepositoy.getStockQty(item, branch);
    }

    TPurchaseOrder loadPendingPurchaseOrder(Integer number, Integer branch) {
        return purchaseOrderRepository.findByNumberAndBranchAndIsView(number,branch,true);
    }

}
