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
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_grn_item")
@XmlRootElement
public class TGrnItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "item")
    private Integer item;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "qty")
    private BigDecimal qty;

    @Column(name = "value")
    private BigDecimal value;

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "net_value")
    private BigDecimal netValue;

    @JoinColumn(name = "grn", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JsonIgnore
    private TGrn grn;

    public TGrnItem() {
    }

    public TGrnItem(Integer indexNo, Integer item, BigDecimal unitPrice, BigDecimal qty, BigDecimal value, BigDecimal discount, BigDecimal netValue, TGrn grn) {
        this.indexNo = indexNo;
        this.item = item;
        this.unitPrice = unitPrice;
        this.qty = qty;
        this.value = value;
        this.discount = discount;
        this.netValue = netValue;
        this.grn = grn;
    }

    public TGrnItem(Integer indexNo) {
        this.indexNo = indexNo;
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

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
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
