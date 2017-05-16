/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.grn.StockLedgerRepository;
import com.mac.care_point.service.grn.model.TStockLedger;
import com.mac.care_point.service.job_item.model.TJobItem;
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
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class JobItemService {

    @Autowired
    private JobItemRepository jobItemRepository;

    @Autowired
    private StockLedgerRepository stockLedgerRepository;

    public TJobItem saveJobItem(TJobItem jobItem) {
        return jobItemRepository.save(jobItem);
    }

    public void deleteJobItem(Integer indexNo) {
        jobItemRepository.delete(indexNo);
    }

    public List<TJobItem> findByJobCardItems(Integer jobCardIndexNo) {
        return jobItemRepository.findByJobCard(jobCardIndexNo);
    }

    //for final check list
    public TJobItem checkItem(Integer item, Integer branch, Integer jobCard, String status) {

        TJobItem jobItem = jobItemRepository.getOne(item);
        if ("COMPLITED".equals(status)) {

            //stock "COMPLITED"
            TStockLedger stockLedger = new TStockLedger();
            stockLedger.setBranch(branch);
            stockLedger.setDate(new Date());
            stockLedger.setFormIndexNo(jobCard);
            stockLedger.setForm(Constant.STOCK_FORM);
            stockLedger.setInQty(BigDecimal.ZERO);
            stockLedger.setItem(jobItem.getItem());
            stockLedger.setOutQty(jobItem.getStockRemoveQty());
            stockLedger.setItemIndexNo(jobItem.getItem());
            stockLedger.setStore(1);
            stockLedgerRepository.save(stockLedger);

        } else {
            //stock "PENDING"
            List<TStockLedger> stockData = stockLedgerRepository.findByItemIndexNoAndFormIndexNo(jobItem.getItem(), jobCard);
            stockLedgerRepository.delete(stockData.get(0));
        }

        jobItem.setOrderStatus(status);
        return jobItemRepository.save(jobItem);
    }

    public List<Object[]> getItemQtyByStockLeger(Integer branch) {
        List<Object[]> getDataList = jobItemRepository.getItemQtyByStockLeger(branch);
        List<Object[]> sendDataList = new ArrayList<>();
        for (Object[] objects : getDataList) {
            BigDecimal qty = ((BigDecimal) objects[1]).subtract((BigDecimal) objects[2]);
            if (qty.compareTo(BigDecimal.ZERO) != 0) {
                Object[] dataList = new Object[]{objects[0], qty};
                sendDataList.add(dataList);
            }
        }
        return sendDataList;
    }

    public BigDecimal findByItemStockItem(Integer branch, Integer item) {
        List<Object[]> getDataList = jobItemRepository.getItemQtyByStock(branch, item);
        return ((BigDecimal) getDataList.get(0)[1]).subtract((BigDecimal) getDataList.get(0)[2]);
    }

}
