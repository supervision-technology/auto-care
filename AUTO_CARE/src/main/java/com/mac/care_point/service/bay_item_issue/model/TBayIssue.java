/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.bay_item_issue.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kavish manjitha
 */
@Entity
@Table(name = "t_bay_issue")
public class TBayIssue implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "quantity")
    private BigDecimal quantity;

    @Basic(optional = false)
    @NotNull
    @Column(name = "stock_remove_qty")
    private BigDecimal stockRemoveQty;

    @Basic(optional = false)
    @NotNull
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "order_status")
    private String orderStatus;

    @Basic(optional = false)
    @Column(name = "item")
    private Integer item;

    @Basic(optional = false)
    @Column(name = "item_units")
    private Integer itemUnits;

    @Basic(optional = false)
    @Column(name = "bay")
    private Integer bay;

    public TBayIssue() {
    }

    public TBayIssue(Integer indexNo, BigDecimal quantity, BigDecimal stockRemoveQty, Date date, String orderStatus, Integer item, Integer itemUnits, Integer bay) {
        this.indexNo = indexNo;
        this.quantity = quantity;
        this.stockRemoveQty = stockRemoveQty;
        this.date = date;
        this.orderStatus = orderStatus;
        this.item = item;
        this.itemUnits = itemUnits;
        this.bay = bay;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getStockRemoveQty() {
        return stockRemoveQty;
    }

    public void setStockRemoveQty(BigDecimal stockRemoveQty) {
        this.stockRemoveQty = stockRemoveQty;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public Integer getBay() {
        return bay;
    }

    public void setBay(Integer bay) {
        this.bay = bay;
    }

    public Integer getItemUnits() {
        return itemUnits;
    }

    public void setItemUnits(Integer itemUnits) {
        this.itemUnits = itemUnits;
    }

    @Override
    public String toString() {
        return "TBayIssue{" + "indexNo=" + indexNo + ", quantity=" + quantity + ", stockRemoveQty=" + stockRemoveQty + ", date=" + date + ", orderStatus=" + orderStatus + ", item=" + item + ", itemUnits=" + itemUnits + ", bay=" + bay + '}';
    }
    
}
