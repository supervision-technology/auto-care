/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn;

import com.mac.care_point.master.items.items.ItemRepository;
import com.mac.care_point.service.grn.model.TGrn;
import com.mac.care_point.service.grn.model.TGrnItem;
import com.mac.care_point.service.purchase_order.PurchaseOrderRepository;
import com.mac.care_point.service.purchase_order.model.TPurchaseOrder;
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
public class GrnService {

    @Autowired
    private GrnRepository grnRepository;

    @Autowired
    private GrnItemRepository grnItemRepository;

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private StockLedgerRepository ledgerRepository;

    @Autowired
    private ItemRepository itemRepository;

    List<TPurchaseOrder> getApprovedPurchaseOrder(Integer branch, String status) {
        return purchaseOrderRepository.findByBranchAndStatusAndIsView(branch, status, true);
    }

    TGrn saveGrnRecieve(TGrn grn) {
        TGrn findLastRow = grnRepository.findFirst1ByOrderByIndexNoDesc();

        if (findLastRow != null) {
            grn.setNumber(findLastRow.getNumber() + 1);
        } else {
            grn.setNumber(1);
        }
        grn.setAmount(new BigDecimal(555555));
//        grn.setGrnItemList(null);

//        for (TGrnItem detail : grn.getGrnItemList()) {
//            detail.setGrn(grn);
//            detail.setDiscount(new BigDecimal(0));
//            detail.setDiscountValue(new BigDecimal(5000));
//            detail.setNetValue(new BigDecimal(15000));
//            detail.setQty(new BigDecimal(15));
//            detail.setUnitPrice(new BigDecimal(1200.00));
//            detail.setValue(new BigDecimal(1200));
//        }
        System.out.println("work");

        TGrn saveGrn = grnRepository.save(grn);

        TGrnItem detail = new TGrnItem();
        detail.setGrn(grn);
        detail.setPurchaseOrderItem(1);
        detail.setDiscount(new BigDecimal(0));
        detail.setDiscountValue(new BigDecimal(5000));
        detail.setNetValue(new BigDecimal(15000));
        detail.setQty(new BigDecimal(15));
        detail.setUnitPrice(new BigDecimal(1200.00));
        detail.setValue(new BigDecimal(1200));

        System.out.println("detail before");
        grnItemRepository.save(detail);
        System.out.println("detail after");
        return saveGrn;
    }

//    List<TGrn> getAllGrn() {
//        return grnRepository.findAll();
//    }
//
//    List<Object[]> getSupplierGrnPaymentHistory(Integer supplier) {
//        System.out.println(supplier);
//        System.out.println("supplier");
//        return grnRepository.getSupplierGrnPaymentHistory(supplier);
//    }
//
//    @Transactional
//    public TGrn saveGrn(TGrn grn) {
//
//        TGrn findLastRow = grnRepository.findFirst1ByOrderByIndexNoDesc();
//
//        if (findLastRow != null) {
//            grn.setNumber(findLastRow.getNumber() + 1);
//        } else {
//            grn.setNumber(1);
//        }
//
//        for (TGrnItem item : grn.getGrnItemList()) {
//            TStockLedger stockLedger = new TStockLedger();
//
//            stockLedger.setBranch(grn.getBranch());
//            stockLedger.setDate(grn.getDate());
//            stockLedger.setForm("GRN_FORM");
//            stockLedger.setInQty(item.getQty());
////            stockLedger.setIndexNo(0);//auto incermen
//            stockLedger.setOutQty(new BigDecimal(0));
//            stockLedger.setStore(1);
//
//            ledgerRepository.save(stockLedger);
//
//            MItem selectItem = itemRepository.getOne(item.getItem());
//
//            itemRepository.save(selectItem);
//
//            item.setGrn(grn);
//            item.setValue(new BigDecimal(item.getQty().doubleValue() * item.getUnitPrice().doubleValue()));
//            item.setNetValue(item.getValue());
//            item.setDiscount(new BigDecimal(0));
//        }
//        return grnRepository.save(grn);
//    }
}
