/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item.model;

import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Kavish Manjitha
 */
@Entity
@Table(name = "t_job_item")
public class TJobItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "item")
    private Integer item;

    @Column(name = "item_unit")
    private Integer itemUnit;

    @Column(name = "item_type")
    private String itemType;

    @Basic(optional = false)
    @Column(name = "quantity")
    private BigDecimal quantity;
    
    @Basic(optional = false)
    @Column(name = "stock_remove_qty")
    private BigDecimal stockRemoveQty;

    @Basic(optional = false)
    @Column(name = "price")
    private BigDecimal price;

    @Basic(optional = false)
    @Column(name = "value")
    private BigDecimal value;

    @Basic(optional = false)
    @Column(name = "order_status")
    private String orderStatus;

    @Basic(optional = false)
    @Column(name = "job_status")
    private String jobStatus;

    @Column(name = "job_card")
    private Integer jobCard;
    
    @Column(name = "is_change")
    private Boolean isChange;


    public TJobItem() {
    }

    public TJobItem(Integer indexNo, Integer item, Integer itemUnit, String itemType, BigDecimal quantity, BigDecimal stockRemoveQty, BigDecimal price, BigDecimal value, String orderStatus, String jobStatus, Integer jobCard) {
        this.indexNo = indexNo;
        this.item = item;
        this.itemUnit = itemUnit;
        this.itemType = itemType;
        this.quantity = quantity;
        this.stockRemoveQty = stockRemoveQty;
        this.price = price;
        this.value = value;
        this.orderStatus = orderStatus;
        this.jobStatus = jobStatus;
        this.jobCard = jobCard;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public Integer getItemUnit() {
        return itemUnit;
    }

    public void setItemUnit(Integer itemUnit) {
        this.itemUnit = itemUnit;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    public Integer getJobCard() {
        return jobCard;
    }

    public void setJobCard(Integer jobCard) {
        this.jobCard = jobCard;
    }

    public BigDecimal getStockRemoveQty() {
        return stockRemoveQty;
    }

    public void setStockRemoveQty(BigDecimal stockRemoveQty) {
        this.stockRemoveQty = stockRemoveQty;
    }

    public Boolean getIsChange() {
        return isChange;
    }

    public void setIsChange(Boolean isChange) {
        this.isChange = isChange;
    }

    @Override
    public String toString() {
        return "TJobItem{" + "indexNo=" + indexNo + ", item=" + item + ", itemUnit=" + itemUnit + ", itemType=" + itemType + ", quantity=" + quantity + ", stockRemoveQty=" + stockRemoveQty + ", price=" + price + ", value=" + value + ", orderStatus=" + orderStatus + ", jobStatus=" + jobStatus + ", jobCard=" + jobCard + ", isChange=" + isChange + '}';
    }
    
    
    
}
