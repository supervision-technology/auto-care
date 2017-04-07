/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_grn")
@XmlRootElement
public class TGrn implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Column(name = "number")
    private Integer number;
    
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Column(name = "amount")
    private BigDecimal amount;
    
    @Size(max = 25)
    @Column(name = "ref_number")
    private String refNumber;
    
    @Column(name = "branch")
    private Integer branch;
    
    @Column(name = "supplier")
    private Integer supplier;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "grn", fetch = FetchType.EAGER)
    private List<TGrnItem> tGrnItemList;

    public TGrn() {
    }

    public TGrn(Integer indexNo,Integer supplier, Integer number, Date date, BigDecimal amount, String refNumber, Integer branch, List<TGrnItem> tGrnItemList) {
        this.indexNo = indexNo;
        this.number = number;
        this.supplier = supplier;
        this.date = date;
        this.amount = amount;
        this.refNumber = refNumber;
        this.branch = branch;
        this.tGrnItemList = tGrnItemList;
    }

    
    public TGrn(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getSupplier() {
        return supplier;
    }

    public void setSupplier(Integer supplier) {
        this.supplier = supplier;
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

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public List<TGrnItem> getTGrnItemList() {
        return tGrnItemList;
    }

    public void setTGrnItemList(List<TGrnItem> tGrnItemList) {
        this.tGrnItemList = tGrnItemList;
    }
 
}
