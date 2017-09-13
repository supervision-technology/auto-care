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

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_supplier_ledger")
public class TSupplierLedger implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;
    
    @Basic(optional = false)
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Basic(optional = false)
    @Column(name = "form_name")
    private String formName;
    
    @Column(name = "supplier_return")
    private Integer supplierReturn;
    
    @Column(name = "grn")
    private Integer grn;
    
    @Column(name = "payment")
    private Integer payment;
    
    @Column(name = "supplier")
    private Integer supplier;
    
    @Column(name = "credit_amount")
    private BigDecimal creditAmount;
    
    @Column(name = "debit_amount")
    private BigDecimal debitAmount;
    
    @Column(name = "ref_number")
    private Integer refNumber;
    
    @Column(name = "is_delete")
    private Boolean isDelete;

    public TSupplierLedger() {
    }

    public TSupplierLedger(Integer indexNo, int branch, Date date, String formName, Integer supplierReturn, Integer grn, Integer payment, Integer supplier, BigDecimal creditAmount, BigDecimal debitAmount, Integer refNumber, Boolean isDelete) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.date = date;
        this.formName = formName;
        this.supplierReturn = supplierReturn;
        this.grn = grn;
        this.payment = payment;
        this.supplier = supplier;
        this.creditAmount = creditAmount;
        this.debitAmount = debitAmount;
        this.refNumber = refNumber;
        this.isDelete = isDelete;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getFormName() {
        return formName;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public Integer getReturn1() {
        return supplierReturn;
    }

    public void setReturn1(Integer return1) {
        this.supplierReturn = return1;
    }

    public Integer getGrn() {
        return grn;
    }

    public void setGrn(Integer grn) {
        this.grn = grn;
    }

    public Integer getPayment() {
        return payment;
    }

    public void setPayment(Integer payment) {
        this.payment = payment;
    }

    public Integer getSupplier() {
        return supplier;
    }

    public void setSupplier(Integer supplier) {
        this.supplier = supplier;
    }

    public BigDecimal getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(BigDecimal creditAmount) {
        this.creditAmount = creditAmount;
    }

    public BigDecimal getDebitAmount() {
        return debitAmount;
    }

    public void setDebitAmount(BigDecimal debitAmount) {
        this.debitAmount = debitAmount;
    }

    public Integer getRefNumber() {
        return refNumber;
    }

    public void setRefNumber(Integer refNumber) {
        this.refNumber = refNumber;
    }

    public Boolean getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }

    
}
