/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 *
 * @author L T430
 */
public class BranchStockModel implements Serializable{
    
    private Integer IndexNo;
    private String color;
    private String branchCode;
    private String branchName;
    private BigDecimal stockQty;
    private BigDecimal orderedQty;
    private BigDecimal balanceQty;

    public BranchStockModel() {
    }

    public BranchStockModel(Integer IndexNo, String color, String branchCode, String branchName, BigDecimal stockQty, BigDecimal orderedQty, BigDecimal balanceQty) {
        this.IndexNo = IndexNo;
        this.color = color;
        this.branchCode = branchCode;
        this.branchName = branchName;
        this.stockQty = stockQty;
        this.orderedQty = orderedQty;
        this.balanceQty = balanceQty;
    }

    public Integer getIndexNo() {
        return IndexNo;
    }

    public void setIndexNo(Integer IndexNo) {
        this.IndexNo = IndexNo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public BigDecimal getStockQty() {
        return stockQty;
    }

    public void setStockQty(BigDecimal stockQty) {
        this.stockQty = stockQty;
    }

    public BigDecimal getOrderedQty() {
        return orderedQty;
    }

    public void setOrderedQty(BigDecimal orderedQty) {
        this.orderedQty = orderedQty;
    }

    public BigDecimal getBalanceQty() {
        return balanceQty;
    }

    public void setBalanceQty(BigDecimal balanceQty) {
        this.balanceQty = balanceQty;
    }
    
    
    
}
