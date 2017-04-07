/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mac.care_point.service.invoice.payment.model.TCustomerPayment;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

/**
 *
 * @author Kavish Manjitha
 */
@Entity
@Table(name = "t_invoice")
public class TInvoice implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Column(name = "job_card")
    private Integer jobCard;
    
    @Column(name = "number")
    private Integer number;
    
    @Column(name = "amount")
    private BigDecimal amount;
    
    @Column(name = "discount_rate")
    private Integer discountRate;
    
    @Column(name = "discount_amount")
    private BigDecimal discountAmount;
    
    @Size(max = 25)
    @Column(name = "status")
    private String status;
    
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "invoice", fetch = FetchType.LAZY)
    private List<TCustomerPayment> tCustomerPaymentList;

    public TInvoice() {
    }

    public TInvoice(Integer indexNo, Date date, Integer jobCard, Integer number, BigDecimal amount, Integer discountRate, BigDecimal discountAmount, String status, List<TCustomerPayment> tCustomerPaymentList) {
        this.indexNo = indexNo;
        this.date = date;
        this.jobCard = jobCard;
        this.number = number;
        this.amount = amount;
        this.discountRate = discountRate;
        this.discountAmount = discountAmount;
        this.status = status;
        this.tCustomerPaymentList = tCustomerPaymentList;
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

    public Integer getJobCard() {
        return jobCard;
    }

    public void setJobCard(Integer jobCard) {
        this.jobCard = jobCard;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getDiscountRate() {
        return discountRate;
    }

    public void setDiscountRate(Integer discountRate) {
        this.discountRate = discountRate;
    }

    public BigDecimal getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<TCustomerPayment> gettCustomerPaymentList() {
        return tCustomerPaymentList;
    }

    public void settCustomerPaymentList(List<TCustomerPayment> tCustomerPaymentList) {
        this.tCustomerPaymentList = tCustomerPaymentList;
    }

   
}
