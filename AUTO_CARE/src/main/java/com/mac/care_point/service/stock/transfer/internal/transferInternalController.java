/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer.internal;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.stock.transfer.model.TStockTransfer;
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
@RequestMapping("/api/care-point/transaction/stock-transfer/internal")
public class TransferInternalController {
    
    @Autowired
    private TransferInternalService internalTransferService;
    
     @RequestMapping(value = "/save-internal-transfer-out", method = RequestMethod.POST)
    public Integer saveTransferOut(@RequestBody TStockTransfer stockTransfer) {

        stockTransfer.setType(Constant.INTERNAL_TRANSFER_OUT);
        stockTransfer.setStatus(Constant.PENDING_STATUS);
        stockTransfer.setToBranch(stockTransfer.getFromBranch());
        return internalTransferService.saveInternalTransferOut(stockTransfer);
    }
     @RequestMapping(value = "/save-internal-transfer-in", method = RequestMethod.POST)
    public Integer saveTransferIn(@RequestBody TStockTransfer stockTransfer) {

        stockTransfer.setType(Constant.INTERNAL_TRANSFER_IN);
        stockTransfer.setStatus(Constant.FINISHE_STATUS);
        return internalTransferService.saveInternalTransferIn(stockTransfer);
    }
    
     @RequestMapping(value = "/pending-transfer-order/{branch}/{stock}", method = RequestMethod.GET)
    public List<TStockTransfer> findAllPendingTransfers(@PathVariable Integer branch, @PathVariable Integer stock) {
        return internalTransferService.findPendingTransferOrders(branch, stock, Constant.PENDING_STATUS,Constant.INTERNAL_TRANSFER_OUT);
    }
}
