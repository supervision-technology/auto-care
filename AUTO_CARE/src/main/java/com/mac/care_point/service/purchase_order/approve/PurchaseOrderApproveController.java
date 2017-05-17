/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order.approve;

import com.mac.care_point.service.purchase_order.model.TPurchaseOrder;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author L T430
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/purchase-order-approve")
public class PurchaseOrderApproveController {

    private Integer branch = 1;
    private String status_approved = "APPROVED";
    private String status_pending = "PENDING";

    @Autowired
    private PurchaseOrderApproveService purchaseOrderApproveService;

    @RequestMapping(value = "/pending-purchase-order", method = RequestMethod.GET)
    public List<TPurchaseOrder> getPendingPurchaseOrders() {
        return purchaseOrderApproveService.getPendingPurchaseOrders(branch, status_pending);
    }
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer savePurchaseOrderApprove(@RequestBody TPurchaseOrder purchaseOrder) {
         
        purchaseOrder.setStatus(status_approved);
        purchaseOrder.setIsView(true);
        purchaseOrder.setFormName("Purchase Order Approve");
        purchaseOrder.setReturnStatus("NON");
        TPurchaseOrder savedPurchaseOrder= purchaseOrderApproveService.savePurchaseOrderApprove(purchaseOrder,status_approved);
        return savedPurchaseOrder.getIndexNo();
    }
    @RequestMapping(value = "/delete/{indexNo}", method = RequestMethod.GET)
    public Integer deletePurchaseOrder(@PathVariable Integer indexNo) {
         return purchaseOrderApproveService.deletePurchaseOrder(indexNo);
      
    }
    

}
