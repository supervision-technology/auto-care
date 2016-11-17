/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.item;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "t_sub_item_check_result")
public class TSubItemCheckResult implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "checked")
    private Boolean checked;

    @Column(name = "transaction")
    private Integer transaction;
    @Basic(optional = false)

    @Size(min = 1, max = 50)
    @Column(name = "reason")
    private String reason;
    @Basic(optional = false)

    @Column(name = "comfirmation")
    private boolean comfirmation;
    @Basic(optional = false)

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic(optional = false)
    @Column(name = "time")
    private String time;

    @Column(name = "branch")
    private Integer branch;

    @JoinColumn(name = "sub_item")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MSubItem subItem;

    public TSubItemCheckResult() {
    }

    public TSubItemCheckResult(Boolean checked, Integer transaction, Integer branch, MSubItem subItem) {
        this.checked = checked;
        this.transaction = transaction;
        this.branch = branch;
        this.subItem = subItem;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public Integer getTransaction() {
        return transaction;
    }

    public void setTransaction(Integer transaction) {
        this.transaction = transaction;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public boolean getComfirmation() {
        return comfirmation;
    }

    public void setComfirmation(boolean comfirmation) {
        this.comfirmation = comfirmation;
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

    public MSubItem getSubItem() {
        return subItem;
    }

    public void setSubItem(MSubItem subItem) {
        this.subItem = subItem;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

}
