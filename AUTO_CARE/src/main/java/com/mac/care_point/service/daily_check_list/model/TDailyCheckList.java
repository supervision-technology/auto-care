/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.daily_check_list.model;

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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Kalum
 */
@Entity
@Table(name = "t_daily_check_list")
@XmlRootElement
public class TDailyCheckList implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Column(name = "branch")
    private Integer branch;
    
    @Column(name = "transaction")
    private Integer transaction;
    
    @Column(name = "complete")
    private Boolean complete;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "dailyCheckList", fetch = FetchType.EAGER)
    private List<TSubItemCheckResult> tSubItemCheckResultList;

    public TDailyCheckList() {
    }

    public TDailyCheckList(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TDailyCheckList(Integer indexNo, Date date) {
        this.indexNo = indexNo;
        this.date = date;
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

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public Integer getTransaction() {
        return transaction;
    }

    public void setTransaction(Integer transaction) {
        this.transaction = transaction;
    }

    public Boolean getComplete() {
        return complete;
    }

    public void setComplete(Boolean complete) {
        this.complete = complete;
    }

    @XmlTransient
    public List<TSubItemCheckResult> getTSubItemCheckResultList() {
        return tSubItemCheckResultList;
    }

    public void setTSubItemCheckResultList(List<TSubItemCheckResult> tSubItemCheckResultList) {
        this.tSubItemCheckResultList = tSubItemCheckResultList;
    }


}
