/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order.model;

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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_purchase_order_detail")
@XmlRootElement
public class TPurchaseOrderDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "item")
    private Integer item;

    @Column(name = "qty")
    private BigDecimal qty;

    @Column(name = "value")
    private BigDecimal value;

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "discount_value")
    private BigDecimal discountValue;

    @Column(name = "net_value")
    private BigDecimal netValue;

    @Column(name = "stock_qty")
    private BigDecimal stockQty;

    @Column(name = "order_qty")
    private BigDecimal orderQty;

    @Column(name = "receive_qty")
    private BigDecimal receiveQty;

    @Column(name = "balance_qty")
    private BigDecimal balanceQty;

    @Column(name = "status")
    private String status;

    @JsonIgnore
    @JoinColumn(name = "purchase_order", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TPurchaseOrder purchaseOrder;

    public TPurchaseOrderDetail() {
    }

    public TPurchaseOrderDetail(Integer indexNo, BigDecimal price, Integer item, BigDecimal qty, BigDecimal value, BigDecimal discount, BigDecimal discountValue, BigDecimal netValue, BigDecimal stockQty, BigDecimal orderQty, BigDecimal receiveQty, BigDecimal balanceQty, String status, TPurchaseOrder purchaseOrder) {
        this.indexNo = indexNo;
        this.price = price;
        this.item = item;
        this.qty = qty;
        this.value = value;
        this.discount = discount;
        this.discountValue = discountValue;
        this.netValue = netValue;
        this.stockQty = stockQty;
        this.orderQty = orderQty;
        this.receiveQty = receiveQty;
        this.balanceQty = balanceQty;
        this.status = status;
        this.purchaseOrder = purchaseOrder;
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

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
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

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
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

    public BigDecimal getStockQty() {
        return stockQty;
    }

    public void setStockQty(BigDecimal stockQty) {
        this.stockQty = stockQty;
    }

    public BigDecimal getOrderQty() {
        return orderQty;
    }

    public void setOrderQty(BigDecimal orderQty) {
        this.orderQty = orderQty;
    }

    public BigDecimal getReceiveQty() {
        return receiveQty;
    }

    public void setReceiveQty(BigDecimal receiveQty) {
        this.receiveQty = receiveQty;
    }

    public BigDecimal getBalanceQty() {
        return balanceQty;
    }

    public void setBalanceQty(BigDecimal balanceQty) {
        this.balanceQty = balanceQty;
    }

    public TPurchaseOrder getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(TPurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }
   
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
