/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer.external;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.stock.transfer.model.TStockTransfer;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.mac.care_point.service.stock.transfer.StockRepository;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author L T430
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/stock-transfer/external")
public class TransferBranchController {

    @Autowired
    private TransferBranchService transferBranchService;

    @RequestMapping(method = RequestMethod.GET)
    public List<TStockTransfer> findAllTransfers() {
        return transferBranchService.findAll();
    }

    @RequestMapping(value = "/approve-transfer-order/{branch}/{stock}", method = RequestMethod.GET)
    public List<TStockTransfer> findAllPendingTransfersByBranchAndStock(@PathVariable Integer branch, @PathVariable Integer stock) {
        return transferBranchService.findPendingTransferOrders(branch, stock, Constant.APPROVE_STATUS,Constant.EXTERNAL_TRANSFER);
    }
   
    @RequestMapping(value = "/pending-transfer-order/{branch}", method = RequestMethod.GET)
    public List<TStockTransfer> findAllPendingTransfers(@PathVariable Integer branch) {
        return transferBranchService.findPendingTransferOrders(branch, Constant.PENDING_STATUS,Constant.EXTERNAL_TRANSFER);
    }
    
    @RequestMapping(value = "/get-item-qty/{branch}/{item}", method = RequestMethod.GET)
    public List<Object[]> getItemQtyByStock(@PathVariable Integer branch, @PathVariable Integer item) {
        return transferBranchService.getItemQtyByStock(branch, item);
    }
    
    @RequestMapping(value = "/get-item-qty-by-stock/{branch}/{item}/{store}", method = RequestMethod.GET)
    public List<Object[]> getItemQtyByStockWithStock(@PathVariable Integer branch, @PathVariable Integer item,@PathVariable Integer store) {
        return transferBranchService.getItemQtyByStockWithStock(branch, item,store);
    }

    @RequestMapping(value = "/save-branch-transfer-out", method = RequestMethod.POST)
    public Integer saveTransferOut(@RequestBody TStockTransfer stockTransfer) {

        stockTransfer.setType(Constant.EXTERNAL_TRANSFER);
        stockTransfer.setStatus(Constant.PENDING_STATUS);
        return transferBranchService.saveTransferOut(stockTransfer);
    }

    @RequestMapping(value = "/save-branch-transfer-in", method = RequestMethod.POST)
    public Integer saveBranchTransferIn(@RequestBody TStockTransfer stockTransfer) {
        return transferBranchService.saveBranchTransferIn(stockTransfer);
    }
    
    @RequestMapping(value = "/save-branch-transfer-out-approve", method = RequestMethod.POST)
    public Integer saveBranchTransferOutApprove(@RequestBody TStockTransfer stockTransfer) {
        stockTransfer.setStatus(Constant.APPROVE_STATUS);
        return transferBranchService.saveBranchTransferOutApprove(stockTransfer);
    }
}
