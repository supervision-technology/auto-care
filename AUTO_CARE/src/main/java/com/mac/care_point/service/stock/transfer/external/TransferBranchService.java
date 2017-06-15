/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer.external;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.stock.transfer.StockRepository;
import com.mac.care_point.service.stock.transfer.TransferRepository;
import com.mac.care_point.service.stock.transfer.TransferStockLedgerRepository;
import com.mac.care_point.service.stock.transfer.model.MStore;
import com.mac.care_point.service.stock.transfer.model.TStockLedger;
import com.mac.care_point.service.stock.transfer.model.TStockTransfer;
import com.mac.care_point.service.stock.transfer.model.TStockTransferItem;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
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
public class TransferBranchService {

    @Autowired
    private TransferRepository transferRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private TransferStockLedgerRepository stockLedgerRepository;

    Integer saveTransferOut(TStockTransfer stockTransfer) {
        //find out Last number
        Integer nextOutNumber = getNextOutNumber(stockTransfer.getFromBranch(), Constant.EXTERNAL_TRANSFER);
        stockTransfer.setOutNumber(nextOutNumber);

        // Stock Ledger List
        List<TStockLedger> stockLedgerList = new ArrayList<>();

        //set from stock
        List<MStore> storeList = stockRepository.findByBranchAndType(stockTransfer.getFromBranch(), Constant.MAIN_STOCK);
        MStore fromStore = new MStore();
        if (storeList.isEmpty()) {
            //default store save
            fromStore.setName("Main Stock");
            fromStore.setNumber(8);//:TODO
            fromStore.setType(Constant.MAIN_STOCK);
            fromStore.setBranch(stockTransfer.getFromBranch());
            fromStore = stockRepository.save(fromStore);
        } else {
            fromStore = storeList.get(0);
        }
        stockTransfer.setFromStore(fromStore.getIndexNo());

//      set to stock
        List<MStore> storeToList = stockRepository.findByBranchAndType(stockTransfer.getToBranch(), Constant.MAIN_STOCK);
        MStore toStore = new MStore();
        if (storeToList.isEmpty()) {
            //default store save
            toStore.setName("Main Stock");
            toStore.setNumber(7);//:TODO
            toStore.setType(Constant.MAIN_STOCK);
            toStore.setBranch(stockTransfer.getToBranch());
            toStore = stockRepository.save(toStore);
        } else {
            toStore = storeToList.get(0);
        }
        stockTransfer.setToStore(toStore.getIndexNo());
        for (TStockTransferItem item : stockTransfer.getTransferItemList()) {

            // get avarage price
            BigDecimal itemAvaragePrice = transferRepository.getItemAvaragePrice(stockTransfer.getFromBranch(), item.getItem());
            TStockLedger stockLedger = new TStockLedger();
            stockLedger.setAvaragePriceIn(new BigDecimal(0));
            stockLedger.setAvaragePriceOut(itemAvaragePrice.multiply(item.getQty()));//calculat avarage price
            stockLedger.setBranch(stockTransfer.getFromBranch());
            stockLedger.setDate(new Date());
            stockLedger.setForm(Constant.BRANCH_TRANSFER_OUT);
            stockLedger.setFormIndexNo(0);//:defined method footer
            stockLedger.setInQty(new BigDecimal(0));
            stockLedger.setItem(item.getItem());
            stockLedger.setOutQty(item.getQty());
            stockLedger.setStore(stockTransfer.getFromStore());

            stockLedgerList.add(stockLedger);

            item.setStockTransfer(stockTransfer);
            item.setCost(itemAvaragePrice);
        }

        TStockTransfer saveObject = transferRepository.save(stockTransfer);

        for (TStockLedger tStockLedger : stockLedgerList) {
            tStockLedger.setFormIndexNo(saveObject.getIndexNo());
            stockLedgerRepository.save(tStockLedger);
        }
        return saveObject.getIndexNo();
    }

    List<TStockTransfer> findAll() {
        return transferRepository.findAll();
    }

    List<TStockTransfer> findPendingTransferOrders(Integer branch, Integer stock, String pending_status,String type) {
        return transferRepository.findByToBranchAndToStoreAndStatusAndType(branch, stock, pending_status,type);
    }
    List<TStockTransfer> findPendingTransferOrders(Integer branch, String pending_status,String type) {
        return transferRepository.findByFromBranchAndStatusAndType(branch, pending_status,type);
    }

    Integer saveBranchTransferIn(TStockTransfer stockTransfer) {
        stockTransfer.setStatus(Constant.FINISHE_STATUS);
        Integer nextInNumber = getNextInNumber(stockTransfer.getFromBranch(), Constant.EXTERNAL_TRANSFER);
        stockTransfer.setInNumber(nextInNumber);
        
          // Stock Ledger List
        List<TStockLedger> stockLedgerList = new ArrayList<>();
        
        for (TStockTransferItem item : stockTransfer.getTransferItemList()) {

            // get avarage price
            BigDecimal itemAvaragePrice = transferRepository.getItemAvaragePrice(stockTransfer.getFromBranch(), item.getItem());
            TStockLedger stockLedger = new TStockLedger();
            stockLedger.setAvaragePriceIn(itemAvaragePrice.multiply(item.getQty()));//calculat avarage price
            stockLedger.setAvaragePriceOut(new BigDecimal(0));
            stockLedger.setBranch(stockTransfer.getToBranch());
            stockLedger.setDate(new Date());
            stockLedger.setForm(Constant.BRANCH_TRANSFER_IN);
            stockLedger.setFormIndexNo(0);//:defined method footer
            stockLedger.setInQty(item.getQty());
            stockLedger.setItem(item.getItem());
            stockLedger.setOutQty(new BigDecimal(0));
            stockLedger.setStore(stockTransfer.getToStore());

            stockLedgerList.add(stockLedger);
        }
        stockTransfer.setTransferItemList(null);
        TStockTransfer saveObject = transferRepository.save(stockTransfer);
         for (TStockLedger tStockLedger : stockLedgerList) {
            tStockLedger.setFormIndexNo(saveObject.getIndexNo());
            stockLedgerRepository.save(tStockLedger);
        }
        return saveObject.getIndexNo();

    }

    List<Object[]> getItemQtyByStock(Integer branch, Integer item) {
        return transferRepository.getItemQtyByStock(branch, item);
    }
    List<Object[]> getItemQtyByStockWithStock(Integer branch, Integer item,Integer store) {
        return transferRepository.getItemQtyByStockWithStock(branch, item,store);
    }

    private Integer getNextOutNumber(int fromBranch, String EXTERNAL_TRANSFER) {
        return transferRepository.getNextOutNumber(fromBranch, EXTERNAL_TRANSFER);
    }

    private Integer getNextInNumber(int fromBranch, String EXTERNAL_TRANSFER) {
        return transferRepository.getNextInNumber(fromBranch, EXTERNAL_TRANSFER);
    }

    Integer saveBranchTransferOutApprove(TStockTransfer stockTransfer) {
        for (TStockTransferItem transferItem : stockTransfer.getTransferItemList()) {
            transferItem.setStockTransfer(stockTransfer);
        }
        TStockTransfer saveObject = transferRepository.save(stockTransfer);
        return saveObject.getIndexNo();
    }

}
