/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn.model;

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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_grn")
public class TGrn implements Serializable {

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
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private BigDecimal amount;
    
    @Size(max = 25)
    @Column(name = "ref_number")
    private String refNumber;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "branch")
    private int branch;
    
    @Column(name = "nbt")
    private BigDecimal nbt;
    
    @Column(name = "nbt_value")
    private BigDecimal nbtValue;
    
    @Column(name = "vat")
    private BigDecimal vat;
    
    @Column(name = "vat_value")
    private BigDecimal vatValue;
    
    @Column(name = "grand_amount")
    private BigDecimal grandAmount;
    
    @Column(name = "pay_amount")
    private BigDecimal payAmount;
    
    @Column(name = "balance_amount")
    private BigDecimal balanceAmount;
    
    @Column(name = "return_value")
    private BigDecimal returnValue;
    
    @Size(max = 25)
    @Column(name = "status")
    private String status;
    
    @Size(max = 25)
    @Column(name = "type")
    private String type;
    
    @Column(name = "is_nbt")
    private Boolean isNbt;
    
    @Column(name = "is_vat")
    private Boolean isVat;
    
    @Column(name = "supplier")
    private Integer supplier;
    
    @Column(name = "credit_period")
    private Integer creditPeriod;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "grn", fetch = FetchType.EAGER)
    private List<TGrnItem> grnItemList;

    public TGrn() {
    }

    public TGrn(Integer indexNo, int number, Date date, BigDecimal amount, String refNumber, int branch, BigDecimal nbt, BigDecimal nbtValue, BigDecimal vat, BigDecimal vatValue, BigDecimal grandAmount, BigDecimal payAmount, BigDecimal balanceAmount, BigDecimal returnValue, String status, String type, Boolean isNbt, Boolean isVat, Integer supplier, Integer creditPeriod, List<TGrnItem> grnItemList) {
        this.indexNo = indexNo;
        this.number = number;
        this.date = date;
        this.amount = amount;
        this.refNumber = refNumber;
        this.branch = branch;
        this.nbt = nbt;
        this.nbtValue = nbtValue;
        this.vat = vat;
        this.vatValue = vatValue;
        this.grandAmount = grandAmount;
        this.payAmount = payAmount;
        this.balanceAmount = balanceAmount;
        this.returnValue = returnValue;
        this.status = status;
        this.type = type;
        this.isNbt = isNbt;
        this.isVat = isVat;
        this.supplier = supplier;
        this.creditPeriod = creditPeriod;
        this.grnItemList = grnItemList;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getRefNumber() {
        return refNumber;
    }

    public void setRefNumber(String refNumber) {
        this.refNumber = refNumber;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }

    public BigDecimal getNbt() {
        return nbt;
    }

    public void setNbt(BigDecimal nbt) {
        this.nbt = nbt;
    }

    public BigDecimal getNbtValue() {
        return nbtValue;
    }

    public void setNbtValue(BigDecimal nbtValue) {
        this.nbtValue = nbtValue;
    }

    public BigDecimal getVat() {
        return vat;
    }

    public void setVat(BigDecimal vat) {
        this.vat = vat;
    }

    public BigDecimal getVatValue() {
        return vatValue;
    }

    public void setVatValue(BigDecimal vatValue) {
        this.vatValue = vatValue;
    }

    public BigDecimal getGrandAmount() {
        return grandAmount;
    }

    public void setGrandAmount(BigDecimal grandAmount) {
        this.grandAmount = grandAmount;
    }

    public BigDecimal getPayAmount() {
        return payAmount;
    }

    public void setPayAmount(BigDecimal payAmount) {
        this.payAmount = payAmount;
    }

    public BigDecimal getBalanceAmount() {
        return balanceAmount;
    }

    public void setBalanceAmount(BigDecimal balanceAmount) {
        this.balanceAmount = balanceAmount;
    }

    public BigDecimal getReturnValue() {
        return returnValue;
    }

    public void setReturnValue(BigDecimal returnValue) {
        this.returnValue = returnValue;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getIsNbt() {
        return isNbt;
    }

    public void setIsNbt(Boolean isNbt) {
        this.isNbt = isNbt;
    }

    public Boolean getIsVat() {
        return isVat;
    }

    public void setIsVat(Boolean isVat) {
        this.isVat = isVat;
    }

    public Integer getSupplier() {
        return supplier;
    }

    public void setSupplier(Integer supplier) {
        this.supplier = supplier;
    }

    public Integer getCreditPeriod() {
        return creditPeriod;
    }

    public void setCreditPeriod(Integer creditPeriod) {
        this.creditPeriod = creditPeriod;
    }

    public List<TGrnItem> getGrnItemList() {
        return grnItemList;
    }

    public void setGrnItemList(List<TGrnItem> grnItemList) {
        this.grnItemList = grnItemList;
    }

}
