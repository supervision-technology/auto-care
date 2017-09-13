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
@Table(name = "t_payment_information")
public class TPaymentInformation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no", nullable = false)
    private Integer indexNo;

    @Size(max = 50)
    @Column(length = 50)
    private String number;

    @Column(name = "cheque_date")
    @Temporal(TemporalType.DATE)
    private Date chequeDate;

    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private BigDecimal amount;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "type")
    private String type;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "form_name", nullable = false, length = 25)
    private String formName;

    @Size(max = 25)
    @Column(name = "card_type", length = 25)
    private String cardType;

    @Basic(optional = false)
    @Column(name = "bank", nullable = false)
    private Integer bank;

    @Basic(optional = false)
    @Column(name = "bank_branch", nullable = false)
    private Integer bankBranch;

    @Column(name = "payment", nullable = false)
    private Integer payment;

    public TPaymentInformation() {
    }

    public TPaymentInformation(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TPaymentInformation(Integer indexNo, String number, Date chequeDate, BigDecimal amount, String type, String formName, String cardType, int bank, int bankBranch, Integer payment) {
        this.indexNo = indexNo;
        this.number = number;
        this.chequeDate = chequeDate;
        this.amount = amount;
        this.type = type;
        this.formName = formName;
        this.cardType = cardType;
        this.bank = bank;
        this.bankBranch = bankBranch;
        this.payment = payment;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Date getChequeDate() {
        return chequeDate;
    }

    public void setChequeDate(Date chequeDate) {
        this.chequeDate = chequeDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFormName() {
        return formName;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public Integer getBank() {
        return bank;
    }

    public void setBank(Integer bank) {
        this.bank = bank;
    }

    public Integer getBankBranch() {
        return bankBranch;
    }

    public void setBankBranch(Integer bankBranch) {
        this.bankBranch = bankBranch;
    }

    public Integer getPayment() {
        return payment;
    }

    public void setPayment(Integer payment) {
        this.payment = payment;
    }

    @Override
    public String toString() {
        return "TPaymentInformation{" + "indexNo=" + indexNo + ", number=" + number + ", chequeDate=" + chequeDate + ", amount=" + amount + ", type=" + type + ", formName=" + formName + ", cardType=" + cardType + ", bank=" + bank + ", bankBranch=" + bankBranch + ", payment=" + payment + '}';
    }

}
