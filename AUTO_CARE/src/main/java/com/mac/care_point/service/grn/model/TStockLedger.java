/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn.model;

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
import javax.validation.constraints.Size;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_stock_ledger")
public class TStockLedger implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "in_qty")
    private BigDecimal inQty;

    @Column(name = "out_qty")
    private BigDecimal outQty;

    @Size(max = 25)
    @Column(name = "form")
    private String form;

    @Column(name = "form_index_no")
    private Integer formIndexNo;

    @Column(name = "item_index_no")
    private Integer itemIndexNo;

    @Column(name = "branch")
    private Integer branch;

    @Column(name = "item")
    private Integer item;

    @Column(name = "store")
    private Integer store;
    
    @Column(name = "avarage_price_in")
    private BigDecimal avaragePriceIn;
    
    @Column(name = "avarage_price_out")
    private BigDecimal avaragePriceOut;
    
    @Column(name = "form_index_no")
    private BigDecimal formIndexNo;

    public TStockLedger() {
    }

    public TStockLedger(Integer indexNo, Date date, BigDecimal inQty, BigDecimal outQty, String form, Integer formIndexNo, Integer itemIndexNo, Integer branch, Integer item, Integer store) {
        this.indexNo = indexNo;
        this.date = date;
        this.inQty = inQty;
        this.outQty = outQty;
        this.form = form;
        this.formIndexNo = formIndexNo;
        this.itemIndexNo = itemIndexNo;
        this.branch = branch;
        this.item = item;
        this.store = store;
        this.avaragePriceIn = avaragePriceIn;
        this.avaragePriceOut = avaragePriceOut;
        this.formIndexNo = formIndexNo;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public BigDecimal getInQty() {
        return inQty;
    }

    public void setInQty(BigDecimal inQty) {
        this.inQty = inQty;
    }

    public BigDecimal getOutQty() {
        return outQty;
    }

    public void setOutQty(BigDecimal outQty) {
        this.outQty = outQty;
    }

    public String getForm() {
        return form;
    }

    public void setForm(String form) {
        this.form = form;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public Integer getStore() {
        return store;
    }

    public void setStore(Integer store) {
        this.store = store;
    }

    public BigDecimal getAvaragePriceIn() {
        return formIndexNo;
    }

    public void setAvaragePriceIn(BigDecimal avaragePriceIn) {
        this.avaragePriceIn = avaragePriceIn;
    }

    public BigDecimal getAvaragePriceOut() {
        return avaragePriceOut;
    }

    public void setAvaragePriceOut(BigDecimal avaragePriceOut) {
        this.avaragePriceOut = avaragePriceOut;
    }

    public Integer getFormIndexNo() {
        return formIndexNo;
    }

    public void setFormIndexNo(Integer formIndexNo) {
        this.formIndexNo = formIndexNo;
    }

}
