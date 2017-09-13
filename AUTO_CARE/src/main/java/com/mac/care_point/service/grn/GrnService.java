/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.grn.model.MStore;
import com.mac.care_point.service.grn.model.TGrn;
import com.mac.care_point.service.grn.model.TGrnItem;
import com.mac.care_point.service.grn.model.TStockLedger;
import com.mac.care_point.service.grn.model.TSupplierLedger;
import com.mac.care_point.service.purchase_order.PurchaseOrderDetailRepository;
import com.mac.care_point.service.purchase_order.PurchaseOrderRepository;
import com.mac.care_point.service.purchase_order.model.TPurchaseOrder;
import com.mac.care_point.service.purchase_order.model.TPurchaseOrderDetail;
import java.math.BigDecimal;
import java.util.ArrayList;
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
    private StoreRepository storeRepository;

    @Autowired
    private StockLedgerRepository stockLedgerRepository;

    @Autowired
    private GrnItemRepository grnItemRepository;

    @Autowired
    private SupplierLedgerRepository supplierLedgerRepository;

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private PurchaseOrderDetailRepository purchaseOrderDetailRepository;

    List<TPurchaseOrder> getApprovedPurchaseOrder(Integer branch, String status) {
        System.out.println("work");
        return purchaseOrderRepository.findByBranchAndStatusAndIsView(branch, status, true);
    }

    @Transactional
    TGrn saveGrnRecieve(TGrn grn) {
        TGrn findLastRow = grnRepository.findFirst1ByOrderByIndexNoDesc();

        if (findLastRow != null) {
            grn.setNumber(findLastRow.getNumber() + 1);
        } else {
            grn.setNumber(1);
        }
        List<TGrnItem> grnItemList = grn.getGrnItemList();
        grn.setGrnItemList(null);
        grn.setGrandAmount(grn.getAmount());
        grn.setBalanceAmount(grn.getGrandAmount());

        TGrn saveGrn = grnRepository.save(grn);

        for (TGrnItem detail : grnItemList) {
            detail.setGrn(saveGrn);
            grnItemRepository.save(detail);
            TPurchaseOrderDetail findDetail = purchaseOrderDetailRepository.findOne(detail.getPurchaseOrderItem());
            if (findDetail != null) {
                findDetail.setReceiveQty(findDetail.getReceiveQty().add(detail.getQty()));
                findDetail.setBalanceQty(findDetail.getBalanceQty().subtract(detail.getQty()));
                purchaseOrderDetailRepository.save(findDetail);
            }
        }

        return saveGrn;
    }

    List<TGrn> getPendingGrnList(Integer branch, String status_pending) {
        return grnRepository.findByBranchAndStatus(branch, status_pending);
    }

    List<TPurchaseOrderDetail> getApprovedPurchaseOrder() {
        return purchaseOrderDetailRepository.findAll();
    }

    TGrn approveGrnRecieve(TGrn grn) {

        for (TGrnItem grnItem : grn.getGrnItemList()) {
            grnItem.setGrn(grn);
//          stock ledger start
            TStockLedger ledger = new TStockLedger();
            ledger.setBranch(grn.getBranch());
            ledger.setDate(grn.getDate());
            ledger.setForm(Constant.GRN_APPROVE_FORM);
            ledger.setFormIndexNo(grn.getIndexNo());
            ledger.setAvaragePriceIn(grnItem.getNetValue());
            ledger.setAvaragePriceOut(new BigDecimal(0));
            ledger.setInQty(grnItem.getQty());
            ledger.setOutQty(new BigDecimal(0));

            TPurchaseOrderDetail findOne = purchaseOrderDetailRepository.findOne(grnItem.getPurchaseOrderItem());
            ledger.setItem(findOne.getItem());
            ledger.setOutQty(new BigDecimal(0));
            //store start
            List<MStore> storeList = storeRepository.findByBranchAndType(grn.getBranch(), Constant.MAIN_STOCK);
            MStore saveStore = new MStore();
            if (storeList.isEmpty()) {
                //default store save
                MStore store = new MStore();
                store.setName(Constant.MAIN_STOCK);
                store.setType(Constant.MAIN_STOCK);
                store.setBranch(grn.getBranch());
                MStore lastNumber = storeRepository.findFirst1ByOrderByNumberDesc();

                store.setNumber(lastNumber.getNumber() + 1);
                saveStore = storeRepository.save(store);
            } else {
                saveStore = storeList.get(0);
            }
            ledger.setStore(saveStore.getIndexNo());
            //store end
            stockLedgerRepository.save(ledger);
//          stock ledger end
        }
        TGrn saveObject = grnRepository.save(grn);

        TSupplierLedger supplierLedger = new TSupplierLedger();
        supplierLedger.setBranch(grn.getBranch());
        supplierLedger.setCreditAmount(grn.getBalanceAmount());
        supplierLedger.setDate(grn.getDate());
        supplierLedger.setDebitAmount(new BigDecimal(0));
        supplierLedger.setFormName(Constant.GRN_APPROVE_FORM);
        supplierLedger.setGrn(saveObject.getIndexNo());
        supplierLedger.setIsDelete(false);
        supplierLedger.setPayment(null);
        supplierLedger.setRefNumber(null);
        supplierLedger.setReturn1(null);
        supplierLedger.setSupplier(grn.getSupplier());

        supplierLedgerRepository.save(supplierLedger);
        return saveObject;
    }

    TGrn saveDirectGrn(TGrn grn) {
        List<TStockLedger> leadgerList = new ArrayList<>();
        for (TGrnItem grnItem : grn.getGrnItemList()) {
            grnItem.setGrn(grn);
//          stock ledger start
            TStockLedger ledger = new TStockLedger();
            ledger.setBranch(grn.getBranch());
            ledger.setDate(grn.getDate());
            ledger.setBranch(grn.getBranch());
            ledger.setForm(Constant.DIRECT_GRN_FORM);
            ledger.setInQty(grnItem.getQty());
            ledger.setAvaragePriceIn(grnItem.getNetValue());
            ledger.setAvaragePriceOut(new BigDecimal(0));
            ledger.setItem(grnItem.getItem());
            ledger.setOutQty(new BigDecimal(0));
            //store start
            List<MStore> storeList = storeRepository.findByBranchAndType(grn.getBranch(), Constant.MAIN_STOCK);
            MStore store = new MStore();
            if (storeList.isEmpty()) {
                //default store save
                store.setName(Constant.MAIN_STOCK);
                store.setType(Constant.MAIN_STOCK);
                store.setBranch(grn.getBranch());
                MStore lastNumber = storeRepository.findFirst1ByOrderByNumberDesc();

                store.setNumber(lastNumber.getNumber() + 1);
                store = storeRepository.save(store);
            } else {
                store = storeList.get(0);
            }
            ledger.setStore(store.getIndexNo());
            //store end
            leadgerList.add(ledger);
//          stock ledger end
        }
        TGrn saveObject = grnRepository.save(grn);
        for (TStockLedger stockLedger : leadgerList) {
            stockLedger.setFormIndexNo(saveObject.getIndexNo());
            stockLedgerRepository.save(stockLedger);
        }

        TSupplierLedger supplierLedger = new TSupplierLedger();
        supplierLedger.setBranch(grn.getBranch());
        supplierLedger.setCreditAmount(grn.getBalanceAmount());
        supplierLedger.setDate(grn.getDate());
        supplierLedger.setDebitAmount(new BigDecimal(0));
        supplierLedger.setFormName(Constant.DIRECT_GRN_FORM);
        supplierLedger.setGrn(saveObject.getIndexNo());
        supplierLedger.setIsDelete(false);
        supplierLedger.setPayment(null);
        supplierLedger.setRefNumber(null);
        supplierLedger.setReturn1(null);
        supplierLedger.setSupplier(grn.getSupplier());

        supplierLedgerRepository.save(supplierLedger);
        return saveObject;
    }

}
