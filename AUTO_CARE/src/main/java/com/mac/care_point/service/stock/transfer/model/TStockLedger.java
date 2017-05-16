/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer.model;

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

/**
 *
 * @author L T430
 */
@Entity(name="com.mac.care_point.service.stock.transfer.model.TStockLedger")
@Table(name = "t_stock_ledger")
public class TStockLedger implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Basic(optional = false)
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Column(name = "in_qty")
    private BigDecimal inQty;
   
    @Column(name = "item")
    private Integer item;
   
    @Column(name = "store")
    private Integer store;
    
    @Column(name = "out_qty")
    private BigDecimal outQty;
    
    @Column(name = "avarage_price_in")
    private BigDecimal avaragePriceIn;
    
    @Column(name = "avarage_price_out")
    private BigDecimal avaragePriceOut;
    
    @Basic(optional = false)
    @Column(name = "form_index_no")
    private int formIndexNo;
    
    @Basic(optional = false)
    @Column(name = "form")
    private String form;
    
    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;

    public TStockLedger() {
    }

    public TStockLedger(Integer indexNo, Date date, BigDecimal inQty, Integer item, Integer store, BigDecimal outQty, BigDecimal avaragePriceIn, BigDecimal avaragePriceOut, int formIndexNo, String form, int branch) {
        this.indexNo = indexNo;
        this.date = date;
        this.inQty = inQty;
        this.item = item;
        this.store = store;
        this.outQty = outQty;
        this.avaragePriceIn = avaragePriceIn;
        this.avaragePriceOut = avaragePriceOut;
        this.formIndexNo = formIndexNo;
        this.form = form;
        this.branch = branch;
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

    public BigDecimal getOutQty() {
        return outQty;
    }

    public void setOutQty(BigDecimal outQty) {
        this.outQty = outQty;
    }

    public BigDecimal getAvaragePriceIn() {
        return avaragePriceIn;
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

    public int getFormIndexNo() {
        return formIndexNo;
    }

    public void setFormIndexNo(int formIndexNo) {
        this.formIndexNo = formIndexNo;
    }

    public String getForm() {
        return form;
    }

    public void setForm(String form) {
        this.form = form;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }
 
    
}
