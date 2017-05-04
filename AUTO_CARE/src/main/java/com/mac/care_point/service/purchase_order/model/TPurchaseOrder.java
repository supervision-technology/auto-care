/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order.model;

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
@Table(name = "t_purchase_order")
public class TPurchaseOrder implements Serializable {

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

    @Column(name = "deliver_date")
    @Temporal(TemporalType.DATE)
    private Date deliverDate;

    @Column(name = "approved_date")
    @Temporal(TemporalType.DATE)
    private Date approvedDate;

    @Size(max = 25)
    @Column(name = "status")
    private String status;

    @Column(name = "is_view")
    private Boolean isView;

    @Column(name = "supplier")
    private Integer supplier;

    @Column(name = "branch")
    private Integer branch;

    @Size(max = 25)
    @Column(name = "form_name")
    private String formName;

    @Column(name = "item_value")
    private BigDecimal itemValue;

    @Column(name = "vat")
    private BigDecimal vat;

    @Column(name = "vat_value")
    private BigDecimal vatValue;

    @Column(name = "nbt")
    private BigDecimal nbt;

    @Column(name = "nbt_value")
    private BigDecimal nbtValue;

    @Column(name = "grand_total")
    private BigDecimal grandTotal;

    @Size(max = 25)
    @Column(name = "return_status")
    private String returnStatus;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "purchaseOrder", fetch = FetchType.EAGER)
    private List<TPurchaseOrderDetail> purchaseOrderItemList;

    public TPurchaseOrder() {
    }

    public TPurchaseOrder(Integer indexNo, int number, Date date, Date deliverDate, Date approvedDate, String status, Boolean isView, Integer supplier, Integer branch, String formName, BigDecimal itemValue, BigDecimal vat, BigDecimal vatValue, BigDecimal nbt, BigDecimal nbtValue, BigDecimal grandTotal, String returnStatus, List<TPurchaseOrderDetail> purchaseOrderItemList) {
        this.indexNo = indexNo;
        this.number = number;
        this.date = date;
        this.deliverDate = deliverDate;
        this.approvedDate = approvedDate;
        this.status = status;
        this.isView = isView;
        this.supplier = supplier;
        this.branch = branch;
        this.formName = formName;
        this.itemValue = itemValue;
        this.vat = vat;
        this.vatValue = vatValue;
        this.nbt = nbt;
        this.nbtValue = nbtValue;
        this.grandTotal = grandTotal;
        this.returnStatus = returnStatus;
        this.purchaseOrderItemList = purchaseOrderItemList;
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

    public Date getDeliverDate() {
        return deliverDate;
    }

    public void setDeliverDate(Date deliverDate) {
        this.deliverDate = deliverDate;
    }

    public Date getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(Date approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getIsView() {
        return isView;
    }

    public void setIsView(Boolean isView) {
        this.isView = isView;
    }

    public Integer getSupplier() {
        return supplier;
    }

    public void setSupplier(Integer supplier) {
        this.supplier = supplier;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public String getFormName() {
        return formName;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public BigDecimal getItemValue() {
        return itemValue;
    }

    public void setItemValue(BigDecimal itemValue) {
        this.itemValue = itemValue;
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

    public BigDecimal getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(BigDecimal grandTotal) {
        this.grandTotal = grandTotal;
    }

    public String getReturnStatus() {
        return returnStatus;
    }

    public void setReturnStatus(String returnStatus) {
        this.returnStatus = returnStatus;
    }

    public List<TPurchaseOrderDetail> getPurchaseOrderItemList() {
        return purchaseOrderItemList;
    }

    public void setPurchaseOrderItemList(List<TPurchaseOrderDetail> purchaseOrderItemList) {
        this.purchaseOrderItemList = purchaseOrderItemList;
    }

}
