/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer.internal;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.stock.transfer.TransferRepository;
import com.mac.care_point.service.stock.transfer.TransferStockLedgerRepository;
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
public class TransferInternalService {

    @Autowired
    private TransferRepository transferRepository;
  
    @Autowired
    private TransferStockLedgerRepository stockLedgerRepository;

    Integer saveInternalTransferOut(TStockTransfer stockTransfer) {
        // Stock Ledger List
        List<TStockLedger> stockLedgerList = new ArrayList<>();
        Integer nextOutNumber = transferRepository.getNextOutNumber(stockTransfer.getFromBranch(), stockTransfer.getType());

        stockTransfer.setOutNumber(nextOutNumber);

        for (TStockTransferItem stockTransferItem : stockTransfer.getTransferItemList()) {
            stockTransferItem.setStockTransfer(stockTransfer);
            BigDecimal itemAvaragePrice = transferRepository.getItemAvaragePrice(stockTransfer.getFromBranch(), stockTransferItem.getItem());
            stockTransferItem.setCost(itemAvaragePrice);

            // set stock ledger
            TStockLedger stockLedger = new TStockLedger();
            
            stockLedger.setAvaragePriceIn(new BigDecimal(0));
            stockLedger.setAvaragePriceOut(itemAvaragePrice.multiply(stockTransferItem.getQty()));//calculat avarage price
            stockLedger.setBranch(stockTransfer.getFromBranch());
            stockLedger.setDate(new Date());
            stockLedger.setForm(Constant.INTERNAL_TRANSFER_OUT);
            stockLedger.setFormIndexNo(0);//:defined method footer
            stockLedger.setInQty(new BigDecimal(0));
            stockLedger.setItem(stockTransferItem.getItem());
            stockLedger.setOutQty(stockTransferItem.getQty());
            stockLedger.setStore(stockTransfer.getFromStore());

            stockLedgerList.add(stockLedger);
        }
        TStockTransfer saveObject = transferRepository.save(stockTransfer);
        //save stock ledger
         for (TStockLedger tStockLedger : stockLedgerList) {
            tStockLedger.setFormIndexNo(saveObject.getIndexNo());
            stockLedgerRepository.save(tStockLedger);
        }
        return saveObject.getOutNumber();
    }

}
