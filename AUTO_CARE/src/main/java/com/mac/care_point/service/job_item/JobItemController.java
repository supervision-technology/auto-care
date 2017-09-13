/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.master.items.items.model.MItemL;
import com.mac.care_point.service.job_item.model.TJobItem;
import com.mac.care_point.zutil.SecurityUtil;
import java.math.BigDecimal;
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
 * @author Kavish Manjitha
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/job-item")
public class JobItemController {

    @Autowired
    private JobItemService jobItemService;

    private final Integer BRANCH = 1;

    //for service selections
    @RequestMapping(value = "/find-all-item", method = RequestMethod.GET)
    public List<MItemL> findAllMItemL() {
        return jobItemService.findAllMItemL();
    }

    //for service selections
    @RequestMapping(value = "/quick-service-item/{itemKey}/{priceCategory}", method = RequestMethod.GET)
    public List<MItemL> getQuickSeacrhItem(@PathVariable String itemKey, @PathVariable Integer priceCategory) {
        return jobItemService.getQuickSeacrhItem(itemKey, priceCategory);
    }
    
    @RequestMapping(value = "/quick-stock-item-non-stock-item/{itemKey}", method = RequestMethod.GET)
    public List<Object[]> getQuickSeacrhItemStockItem(@PathVariable String itemKey) {
        return jobItemService.getQuickSeacrhItemStockItem(itemKey);
    }

    @RequestMapping(value = "/save-job-items", method = RequestMethod.POST)
    public TJobItem saveJobItem(@RequestBody TJobItem jobItem) {
        return jobItemService.saveJobItem(jobItem);
    }

    //for service selections
    @RequestMapping(value = "/delete-job-items/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteJobItem(@PathVariable Integer indexNo) {
        jobItemService.deleteJobItem(indexNo);
        return indexNo;
    }

    //for service selections
    @RequestMapping(value = "/find-by-job-card-items/{jobCardIndexNo}", method = RequestMethod.GET)
    public List<TJobItem> findByJobCardItems(@PathVariable Integer jobCardIndexNo) {
        return jobItemService.findByJobCardItems(jobCardIndexNo);

    }

    //for final check list(complited and pending)
    @RequestMapping(value = "/check-item/{item}/{status}/{jobCard}", method = RequestMethod.GET)
    public TJobItem checkItem(@PathVariable Integer item, @PathVariable String status, @PathVariable Integer jobCard) {
        return jobItemService.checkItem(item, SecurityUtil.getCurrentUser().getBranch(), jobCard, status);
    }

    //get stock leger get item qty for item selection stock item qty
    @RequestMapping(value = "/all-non-stock-and-stock-item/{itemCategory}", method = RequestMethod.GET)
    public List<Object[]> getItemStockItemAndNonStockItem(@PathVariable Integer itemCategory) {
        return jobItemService.getItemStockItemAndNonStockItem(itemCategory);
    }

    @RequestMapping(value = "/get-item-by-item-category/{indexNo}", method = RequestMethod.GET)
    public List<MItemL> findByItemCategory(@PathVariable Integer indexNo) {
        return jobItemService.findByItemCategory(indexNo);
    }

    //find by stock item qty from item
    @RequestMapping(value = "/get-item-qty-by-stocks/{item}", method = RequestMethod.GET)
    public BigDecimal getItemQtyByStockLegerQty(@PathVariable Integer item) {
        return jobItemService.findByItemStockItem(SecurityUtil.getCurrentUser().getBranch(), item);
    }

    //final check list
    @RequestMapping(value = "/find-item-check-by-job-card/{jobCard}", method = RequestMethod.GET)
    public List<TJobItem> findByJobCard(@PathVariable Integer jobCard) {
        return jobItemService.findByJobCard(jobCard);
    }

    //service selections check item - final check status check and stock issue item
    @RequestMapping(value = "/find-item-by-index-no/{indexNo}", method = RequestMethod.GET)
    public TJobItem findTJobItemByIndexNo(@PathVariable Integer indexNo) {
        return jobItemService.findTJobItemByIndexNo(indexNo);
    }
    
    @RequestMapping(value = "/change-vehicle-price-category/{jobCard}",method = RequestMethod.GET)
       public List<TJobItem> changeVehiclePriceCategory(@PathVariable Integer jobCard) {
        return jobItemService.changeVehiclePriceCategory(jobCard);
    }
    
}
