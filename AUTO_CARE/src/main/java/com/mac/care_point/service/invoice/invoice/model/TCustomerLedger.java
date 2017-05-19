/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice.model;

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
@Table(name = "t_customer_ledger")
public class TCustomerLedger implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no", nullable = false)
    private Integer indexNo;
    
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Column(name = "debit_amount", precision = 10, scale = 4)
    private BigDecimal debitAmount;
    
    @Column(name = "credit_amount", precision = 10, scale = 4)
    private BigDecimal creditAmount;
    
    @Size(max = 25)
    @Column(length = 25)
    private String type;
    
    @Basic(optional = false)
    @NotNull
    @Column(nullable = false)
    private int client;
        
    @Column(name = "invoice")
    private Integer invoice;
    
    @Column(name = "payment")
    private Integer payment;

    public TCustomerLedger() {
    }

    public TCustomerLedger(Integer indexNo, Date date, BigDecimal debitAmount, BigDecimal creditAmount, String type, int client, Integer invoice, Integer payment) {
        this.indexNo = indexNo;
        this.date = date;
        this.debitAmount = debitAmount;
        this.creditAmount = creditAmount;
        this.type = type;
        this.client = client;
        this.invoice = invoice;
        this.payment = payment;
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

    public BigDecimal getDebitAmount() {
        return debitAmount;
    }

    public void setDebitAmount(BigDecimal debitAmount) {
        this.debitAmount = debitAmount;
    }

    public BigDecimal getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(BigDecimal creditAmount) {
        this.creditAmount = creditAmount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getClient() {
        return client;
    }

    public void setClient(int client) {
        this.client = client;
    }

    public Integer getInvoice() {
        return invoice;
    }

    public void setInvoice(Integer invoice) {
        this.invoice = invoice;
    }

    public Integer getPayment() {
        return payment;
    }

    public void setPayment(Integer payment) {
        this.payment = payment;
    }

}
