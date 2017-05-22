/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order.request;

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
@RequestMapping("/api/care-point/transaction/purchase-order-request")
public class PurchaseOrderController {

    private Integer branch = 1;
    private String status = "PENDING";

    @Autowired
    private PurchaseOrderService purchaseOrderService;
    
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Integer savePurchaseOrder(@RequestBody TPurchaseOrder purchaseOrder) {
         
        purchaseOrder.setBranch(branch);
        purchaseOrder.setStatus(status);
        purchaseOrder.setIsView(true);
        purchaseOrder.setFormName("Purchase Order Request");
        purchaseOrder.setReturnStatus("NON");
        TPurchaseOrder savedPurchaseOrder= purchaseOrderService.savePurchaseOrder(purchaseOrder,status);
        return savedPurchaseOrder.getIndexNo();
    }
    
    @RequestMapping(value = "/stock-qty/{item}", method = RequestMethod.GET)
    public double getStockQty(@PathVariable Integer item) {
        return purchaseOrderService.getStockQty(item,branch);
    }
    @RequestMapping(value = "/load-pending-purchase-order/{number}", method = RequestMethod.GET)
    public TPurchaseOrder loadPendingPurchaseOrder(@PathVariable Integer number) {
        return purchaseOrderService.loadPendingPurchaseOrder(number,branch);
    }

}
