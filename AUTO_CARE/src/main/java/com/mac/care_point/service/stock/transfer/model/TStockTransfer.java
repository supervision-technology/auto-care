/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer.model;

import java.io.Serializable;
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
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_stock_transfer")
public class TStockTransfer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "out_number")
    private int outNumber;
    
    @Column(name = "in_number")
    private Integer inNumber;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "out_date")
    @Temporal(TemporalType.DATE)
    private Date outDate;
    
    @Column(name = "in_date")
    @Temporal(TemporalType.DATE)
    private Date inDate;
    
    @Size(max = 25)
    @Column(name = "ref_number")
    private String refNumber;
    
    @Size(max = 50)
    @Column(name = "remarks")
    private String remarks;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "from_branch")
    private int fromBranch;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "to_branch")
    private int toBranch;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "from_store")
    private int fromStore;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "to_store")
    private int toStore;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "type")
    private String type;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "status")
    private String status;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "stockTransfer", fetch = FetchType.EAGER)
    private List<TStockTransferItem> transferItemList;

    public TStockTransfer() {
    }

    public TStockTransfer(Integer indexNo, int outNumber, Integer inNumber, Date outDate, Date inDate, String refNumber, String remarks, int fromBranch, int toBranch, int fromStore, int toStore, String type, String status, List<TStockTransferItem> transferItemList) {
        this.indexNo = indexNo;
        this.outNumber = outNumber;
        this.inNumber = inNumber;
        this.outDate = outDate;
        this.inDate = inDate;
        this.refNumber = refNumber;
        this.remarks = remarks;
        this.fromBranch = fromBranch;
        this.toBranch = toBranch;
        this.fromStore = fromStore;
        this.toStore = toStore;
        this.type = type;
        this.status = status;
        this.transferItemList = transferItemList;
    }

   

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public int getOutNumber() {
        return outNumber;
    }

    public void setOutNumber(int outNumber) {
        this.outNumber = outNumber;
    }

    public Integer getInNumber() {
        return inNumber;
    }

    public void setInNumber(Integer inNumber) {
        this.inNumber = inNumber;
    }

    public Date getOutDate() {
        return outDate;
    }

    public void setOutDate(Date outDate) {
        this.outDate = outDate;
    }

    public Date getInDate() {
        return inDate;
    }

    public void setInDate(Date inDate) {
        this.inDate = inDate;
    }

    public String getRefNumber() {
        return refNumber;
    }

    public void setRefNumber(String refNumber) {
        this.refNumber = refNumber;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public int getFromBranch() {
        return fromBranch;
    }

    public void setFromBranch(int fromBranch) {
        this.fromBranch = fromBranch;
    }

    public int getToBranch() {
        return toBranch;
    }

    public void setToBranch(int toBranch) {
        this.toBranch = toBranch;
    }

    public int getFromStore() {
        return fromStore;
    }

    public void setFromStore(int fromStore) {
        this.fromStore = fromStore;
    }

    public int getToStore() {
        return toStore;
    }

    public void setToStore(int toStore) {
        this.toStore = toStore;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @XmlTransient
    public List<TStockTransferItem> getTransferItemList() {
        return transferItemList;
    }

    public void setTransferItemList(List<TStockTransferItem> transferItemList) {
        this.transferItemList = transferItemList;
    }

   
}
