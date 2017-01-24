/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.model.item;

import java.io.Serializable;
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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "m_sub_item")
public class MSubItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Column(name = "branch")
    private Integer branch;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "sub_name")
    private String subName;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "short_order")
    private int shortOrder;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "active")
    private boolean active;

    @JoinColumn(name = "item")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MItem item;

    public MSubItem() {
    }

    public MSubItem(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MSubItem(Integer indexNo, String subName, int shortOrder, boolean active) {
        this.indexNo = indexNo;
        this.subName = subName;
        this.shortOrder = shortOrder;
        this.active = active;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public String getSubName() {
        return subName;
    }

    public void setSubName(String subName) {
        this.subName = subName;
    }

    public int getShortOrder() {
        return shortOrder;
    }

    public void setShortOrder(int shortOrder) {
        this.shortOrder = shortOrder;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public MItem getItem() {
        return item;
    }

    public void setItem(MItem item) {
        this.item = item;
    }

}
