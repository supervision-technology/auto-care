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
public class ReOrderItemModel implements Serializable{
    
    private Integer reOrderIndexNo;
    private Integer item;
    private BigDecimal maxReOrder;
    private BigDecimal minReOrder;
    private String branch;
    private Integer branchId;
    private String itemName;
    private String supplierName;
    private Integer supplierId;
    private BigDecimal stockQty;
    private BigDecimal orderQty;
    private BigDecimal totalOrder;
    private String branchColor;

    public ReOrderItemModel() {
    }

    public ReOrderItemModel(Integer reOrderIndexNo, Integer item, BigDecimal maxReOrder, BigDecimal minReOrder, String branch, Integer branchId, String itemName, String supplierName, Integer supplierId, BigDecimal stockQty, BigDecimal orderQty, BigDecimal totalOrder, String branchColor) {
        this.reOrderIndexNo = reOrderIndexNo;
        this.item = item;
        this.maxReOrder = maxReOrder;
        this.minReOrder = minReOrder;
        this.branch = branch;
        this.branchId = branchId;
        this.itemName = itemName;
        this.supplierName = supplierName;
        this.supplierId = supplierId;
        this.stockQty = stockQty;
        this.orderQty = orderQty;
        this.totalOrder = totalOrder;
        this.branchColor = branchColor;
    }

    public Integer getReOrderIndexNo() {
        return reOrderIndexNo;
    }

    public void setReOrderIndexNo(Integer reOrderIndexNo) {
        this.reOrderIndexNo = reOrderIndexNo;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public BigDecimal getMaxReOrder() {
        return maxReOrder;
    }

    public void setMaxReOrder(BigDecimal maxReOrder) {
        this.maxReOrder = maxReOrder;
    }

    public BigDecimal getMinReOrder() {
        return minReOrder;
    }

    public void setMinReOrder(BigDecimal minReOrder) {
        this.minReOrder = minReOrder;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public BigDecimal getStockQty() {
        return stockQty;
    }

    public void setStockQty(BigDecimal stockQty) {
        this.stockQty = stockQty;
    }

    public BigDecimal getOrderQty() {
        return orderQty;
    }

    public void setOrderQty(BigDecimal orderQty) {
        this.orderQty = orderQty;
    }

    public BigDecimal getTotalOrder() {
        return totalOrder;
    }

    public void setTotalOrder(BigDecimal totalOrder) {
        this.totalOrder = totalOrder;
    }

    public String getBranchColor() {
        return branchColor;
    }

    public void setBranchColor(String branchColor) {
        this.branchColor = branchColor;
    }

   

  
}
