/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer.internal;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.stock.transfer.model.TStockTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
}
