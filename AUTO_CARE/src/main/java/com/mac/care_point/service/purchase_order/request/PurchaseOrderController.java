/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order.request;

import com.mac.care_point.service.purchase_order.model.BranchStockModel;
import com.mac.care_point.service.purchase_order.model.ReOrderItemModel;
import com.mac.care_point.service.purchase_order.model.TPurchaseOrder;
import java.math.BigDecimal;
import java.util.ArrayList;
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
        TPurchaseOrder savedPurchaseOrder = purchaseOrderService.savePurchaseOrder(purchaseOrder, status);
        return savedPurchaseOrder.getIndexNo();
    }

    @RequestMapping(value = "/stock-qty/{item}", method = RequestMethod.GET)
    public double getStockQty(@PathVariable Integer item) {
        return purchaseOrderService.getStockQty(item, branch);
    }

    @RequestMapping(value = "/load-pending-purchase-order/{number}", method = RequestMethod.GET)
    public TPurchaseOrder loadPendingPurchaseOrder(@PathVariable Integer number) {
        return purchaseOrderService.loadPendingPurchaseOrder(number, branch);
    }

    @RequestMapping(value = "/load-stock-in-branches/{item}", method = RequestMethod.GET)
    public List<BranchStockModel> loadStockInBranches(@PathVariable Integer item) {
        List<BranchStockModel> stockList = new ArrayList<>();
        List<Object[]> list = purchaseOrderService.loadStockInBranches(item);

        Integer count = 1;
        for (Object[] object : list) {
            BranchStockModel model = new BranchStockModel();
            model.setIndexNo(count);
            model.setColor(object[0].toString());
            model.setBranchCode(object[1].toString());
            model.setBranchName(object[2].toString());
            model.setStockQty(new BigDecimal(object[3].toString()));
            model.setOrderedQty(new BigDecimal(object[4].toString()));
            model.setBalanceQty(model.getStockQty().subtract(model.getOrderedQty()));
            stockList.add(model);
            count++;
        }
        return stockList;
    }

    @RequestMapping(value = "/getOrderRequestItems", method = RequestMethod.GET)
    public List<ReOrderItemModel> loadStockInBranches() {

//        return purchaseOrderService.getOrderRequestItems();
        List<Object[]> list = purchaseOrderService.getOrderRequestItems();
        List<ReOrderItemModel> reOrderList = new ArrayList<>();
        for(Object[] objects : list) {
            ReOrderItemModel reOrder = new ReOrderItemModel();
            reOrder.setReOrderIndexNo(Integer.parseInt(objects[0].toString()));
            reOrder.setItem(Integer.parseInt(objects[1].toString()));
            reOrder.setMaxReOrder(new BigDecimal(objects[2].toString()));
            reOrder.setMinReOrder(new BigDecimal(objects[3].toString()));
            reOrder.setBranch(objects[4].toString());
            reOrder.setBranchId(Integer.parseInt(objects[5].toString()));
            reOrder.setItemName(objects[6].toString());
            reOrder.setSupplierName(objects[7].toString());
            reOrder.setSupplierId(Integer.parseInt(objects[8].toString()));
            reOrder.setStockQty(new BigDecimal(objects[9].toString()));
            reOrder.setOrderQty(new BigDecimal(objects[10].toString()));
            reOrder.setTotalOrder(new BigDecimal(objects[11].toString()));
            reOrder.setBranchColor(objects[12].toString());
            reOrder.setAvailableQty(new BigDecimal(objects[13].toString()));
            reOrder.setPurchasingQty(new BigDecimal(objects[14].toString())==null?new BigDecimal(0):new BigDecimal(objects[14].toString()));
            
            BigDecimal netRequiredQty =reOrder.getTotalOrder().subtract(reOrder.getPurchasingQty());
            reOrder.setNetRequiredQty(netRequiredQty.compareTo(reOrder.getPurchasingQty()) > 0==false?new BigDecimal(0):netRequiredQty);

            reOrderList.add(reOrder);

        }
        return reOrderList;
    }

    @RequestMapping(value = "/get-main-branch-available-stock/{item}", method = RequestMethod.GET)
    public double mainBranchAvailableStock(@PathVariable Integer item) {
        return purchaseOrderService.mainBranchAvailableStock(item);
    }

}
