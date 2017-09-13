/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.reOrderLevel.model;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "m_re_order_level")
public class MReOrderLevel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Basic(optional = false)
    @Column(name = "branch")
    private Integer branch;
    
    @Basic(optional = false)
    @Column(name = "item")
    private Integer item;
    
    @Basic(optional = false)
    @Column(name = "re_order_max")
    private BigDecimal reOrderMax;
    
    @Basic(optional = false)
    @Column(name = "re_order_min")
    private BigDecimal reOrderMin;

    public MReOrderLevel() {
    }

    public MReOrderLevel(Integer indexNo, Integer branch, Integer item, BigDecimal reOrderMax, BigDecimal reOrderMin) {
        this.indexNo = indexNo;
        this.branch = branch;
        this.item = item;
        this.reOrderMax = reOrderMax;
        this.reOrderMin = reOrderMin;
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

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public BigDecimal getReOrderMax() {
        return reOrderMax;
    }

    public void setReOrderMax(BigDecimal reOrderMax) {
        this.reOrderMax = reOrderMax;
    }

    public BigDecimal getReOrderMin() {
        return reOrderMin;
    }

    public void setReOrderMin(BigDecimal reOrderMin) {
        this.reOrderMin = reOrderMin;
    }

}
