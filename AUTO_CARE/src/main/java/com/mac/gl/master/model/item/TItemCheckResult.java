/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.item;

import com.mac.gl.master.model.item.MItem;
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
import javax.validation.constraints.NotNull;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "t_item_check_result")
public class TItemCheckResult implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "transaction")
    private Integer transaction;

    @Basic(optional = false)
    @NotNull
    @Column(name = "checked")
    private boolean checked;

    @Basic(optional = false)
    @NotNull
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic(optional = false)
    @NotNull
    @Column(name = "check_stage")
    private int checkStage;

    @Basic(optional = false)
    @NotNull
    @Column(name = "wating_checked")
    private int watingChecked;

    @Column(name = "branch")
    private Integer branch;

    @JoinColumn(name = "item")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MItem item;

    public TItemCheckResult() {
    }

    public TItemCheckResult(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public TItemCheckResult(Integer transaction, boolean checked, Date date, int checkStage, int watingChecked, Integer branch, MItem item) {
        this.transaction = transaction;
        this.checked = checked;
        this.date = date;
        this.checkStage = checkStage;
        this.watingChecked = watingChecked;
        this.branch = branch;
        this.item = item;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getTransaction() {
        return transaction;
    }

    public void setTransaction(Integer transaction) {
        this.transaction = transaction;
    }

    public boolean getChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getCheckStage() {
        return checkStage;
    }

    public void setCheckStage(int checkStage) {
        this.checkStage = checkStage;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public MItem getItem() {
        return item;
    }

    public void setItem(MItem item) {
        this.item = item;
    }

    public int getWatingChecked() {
        return watingChecked;
    }

    public void setWatingChecked(int watingChecked) {
        this.watingChecked = watingChecked;
    }

}
