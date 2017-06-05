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

/**
 *
 * @author kavish manjitha
 */
@Entity
@Table(name = "t_bay_stock_leger")
public class TBayStockLeger implements Serializable {

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

    @Column(name = "out_qty")
    private BigDecimal outQty;

    @Basic(optional = false)
    @Column(name = "form_index_no")
    private int formIndexNo;

    @Basic(optional = false)
    @Column(name = "form")
    private String form;

    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;

    @Basic(optional = false)
    @Column(name = "bay")
    private Integer bay;

    @Basic(optional = false)
    @Column(name = "item")
    private Integer item;

    public TBayStockLeger() {
    }

    public TBayStockLeger(Integer indexNo, Date date, BigDecimal inQty, BigDecimal outQty, int formIndexNo, String form, int branch, Integer bay, Integer item) {
        this.indexNo = indexNo;
        this.date = date;
        this.inQty = inQty;
        this.outQty = outQty;
        this.formIndexNo = formIndexNo;
        this.form = form;
        this.branch = branch;
        this.bay = bay;
        this.item = item;
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

    public Integer getBay() {
        return bay;
    }

    public void setBay(Integer bay) {
        this.bay = bay;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

}
