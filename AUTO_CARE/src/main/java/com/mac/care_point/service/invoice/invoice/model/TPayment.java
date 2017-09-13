/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice.model;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Kavish Manjitha
 */
@Entity
@Table(name = "t_payment")
public class TPayment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "number")
    private int number;

    @Basic(optional = false)
    @NotNull
    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "cash_amount")
    private BigDecimal cashAmount;

    @Column(name = "cheque_amount")
    private BigDecimal chequeAmount;

    @Column(name = "card_amount")
    private BigDecimal cardAmount;
    
    @Column(name = "over_payment_amount")
    private BigDecimal overPaymentAmount;
    
    @Column(name = "resp_employee")
    private Integer respEmployee;
    
    public TPayment() {
    }

    public TPayment(Integer indexNo, int number, BigDecimal totalAmount, BigDecimal cashAmount, BigDecimal chequeAmount, BigDecimal cardAmount, BigDecimal overPaymentAmount, Integer respEmployee) {
        this.indexNo = indexNo;
        this.number = number;
        this.totalAmount = totalAmount;
        this.cashAmount = cashAmount;
        this.chequeAmount = chequeAmount;
        this.cardAmount = cardAmount;
        this.overPaymentAmount = overPaymentAmount;
        this.respEmployee = respEmployee;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BigDecimal getCashAmount() {
        return cashAmount;
    }

    public void setCashAmount(BigDecimal cashAmount) {
        this.cashAmount = cashAmount;
    }

    public BigDecimal getChequeAmount() {
        return chequeAmount;
    }

    public void setChequeAmount(BigDecimal chequeAmount) {
        this.chequeAmount = chequeAmount;
    }

    public BigDecimal getCardAmount() {
        return cardAmount;
    }

    public void setCardAmount(BigDecimal cardAmount) {
        this.cardAmount = cardAmount;
    }

    public BigDecimal getOverPaymentAmount() {
        return overPaymentAmount;
    }

    public void setOverPaymentAmount(BigDecimal overPaymentAmount) {
        this.overPaymentAmount = overPaymentAmount;
    }

    public Integer getRespEmployee() {
        return respEmployee;
    }

    public void setRespEmployee(Integer respEmployee) {
        this.respEmployee = respEmployee;
    }
   
}
