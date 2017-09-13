/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_grn_item")
public class TGrnItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "price")
    private BigDecimal price;

    @Basic(optional = false)
    @NotNull
    @Column(name = "qty")
    private BigDecimal qty;

    @Basic(optional = false)
    @NotNull
    @Column(name = "value")
    private BigDecimal value;
    
    @Column(name = "item")
    private Integer item;

    @Column(name = "discount")
    private BigDecimal discount;
    
    @Column(name = "purchase_order_item")
    private Integer purchaseOrderItem;

    @Column(name = "discount_value")
    private BigDecimal discountValue;

    @Basic(optional = false)
    @NotNull
    @Column(name = "net_value")
    private BigDecimal netValue;
    
    @JsonIgnore
    @JoinColumn(name = "grn", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TGrn grn;

    public TGrnItem() {
    }

    public TGrnItem(Integer indexNo, BigDecimal price, BigDecimal qty, BigDecimal value, Integer item, BigDecimal discount, Integer purchaseOrderItem, BigDecimal discountValue, BigDecimal netValue, TGrn grn) {
        this.indexNo = indexNo;
        this.price = price;
        this.qty = qty;
        this.value = value;
        this.item = item;
        this.discount = discount;
        this.purchaseOrderItem = purchaseOrderItem;
        this.discountValue = discountValue;
        this.netValue = netValue;
        this.grn = grn;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getQty() {
        return qty;
    }

    public void setQty(BigDecimal qty) {
        this.qty = qty;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public Integer getPurchaseOrderItem() {
        return purchaseOrderItem;
    }

    public void setPurchaseOrderItem(Integer purchaseOrderItem) {
        this.purchaseOrderItem = purchaseOrderItem;
    }

    public BigDecimal getDiscountValue() {
        return discountValue;
    }

    public void setDiscountValue(BigDecimal discountValue) {
        this.discountValue = discountValue;
    }

    public BigDecimal getNetValue() {
        return netValue;
    }

    public void setNetValue(BigDecimal netValue) {
        this.netValue = netValue;
    }

    public TGrn getGrn() {
        return grn;
    }

    public void setGrn(TGrn grn) {
        this.grn = grn;
    }

}
