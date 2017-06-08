/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.bay_item_issue;

import com.mac.care_point.service.bay_item_issue.model.TBayIssue;
import com.mac.care_point.service.bay_item_issue.model.TBayStockLeger;
import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.grn.StockLedgerRepository;
import com.mac.care_point.service.grn.model.TStockLedger;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kavish manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class TBayIssueService {

    @Autowired
    private TBayIssueRepository tBayIssueRepository;

    @Autowired
    private TBayStockLegerRepository tBayStockLegerRepository;

    @Autowired
    private StockLedgerRepository stockLedgerRepository;

    public TBayIssue saveTBayIssue(TBayIssue bayIssue) {
        return tBayIssueRepository.save(bayIssue);
    }

    public void deleteTBayIssue(Integer indexNo) {
        tBayIssueRepository.delete(indexNo);
    }

    public List<TBayIssue> findByBayAndOrderStatus(Integer bay,String status) {
        return tBayIssueRepository.findByBayAndOrderStatus(bay, status);
    }

    @Transactional
    public TBayIssue checkItem(Integer bayIssueIndexNo, Integer BRANCH, String status) {
        TBayIssue bayIssue = tBayIssueRepository.getOne(bayIssueIndexNo);
        bayIssue.setOrderStatus(status);

        if (Constant.COMPLITED_STATUS.equals(bayIssue.getOrderStatus())) {
            //bay stock leger data
            TBayStockLeger bayStockLeger = new TBayStockLeger();
            bayStockLeger.setBay(bayIssue.getBay());
            bayStockLeger.setBranch(BRANCH);
            bayStockLeger.setForm(Constant.BAY_ISSUE);
            bayStockLeger.setFormIndexNo(bayIssue.getIndexNo());
            bayStockLeger.setInQty(bayIssue.getStockRemoveQty());
            bayStockLeger.setOutQty(BigDecimal.ZERO);
            bayStockLeger.setItem(bayIssue.getItem());
            bayStockLeger.setDate(new Date());
            tBayStockLegerRepository.save(bayStockLeger);

            //items stock leget inser data
            TStockLedger stockLedger = new TStockLedger();
            stockLedger.setBranch(BRANCH);
            stockLedger.setDate(new Date());
            stockLedger.setFormIndexNo(bayIssue.getIndexNo());
            stockLedger.setForm(Constant.BAY_ISSUE);
            stockLedger.setInQty(BigDecimal.ZERO);
            stockLedger.setItem(bayIssue.getItem());
            stockLedger.setOutQty(bayIssue.getStockRemoveQty());
            stockLedger.setStore(1);
            stockLedgerRepository.save(stockLedger);

        } else {
            //bay stock leger remove
            List<TBayStockLeger> getStockLegerData = tBayStockLegerRepository.findByItemAndFormIndexNo(bayIssue.getItem(), bayIssue.getIndexNo());
            tBayStockLegerRepository.delete(getStockLegerData.get(0));

            //item stock leger remove
            List<TStockLedger> stockData = stockLedgerRepository.findByItemAndFormIndexNo(bayIssue.getItem(), bayIssue.getIndexNo());
            stockLedgerRepository.delete(stockData.get(0));
        }

        return tBayIssueRepository.save(bayIssue);
    }

    public List<TBayIssue> findByBayAndOrderStatusAndDate(Integer bay, String status) {
        return tBayIssueRepository.findByBayAndOrderStatusAndDate(bay, status, new Date());
    }

}
