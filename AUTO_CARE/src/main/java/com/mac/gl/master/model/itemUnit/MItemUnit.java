/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.itemUnit;

import com.mac.gl.master.model.item.MItem;
import java.io.Serializable;
import java.math.BigDecimal;
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

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "m_item_units")
public class MItemUnit implements Serializable {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    @Basic(optional = false)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @Column(name = "qty")
    private BigDecimal qty;
    @Basic(optional = false)
    @Column(name = "sales_price")
    private BigDecimal salesPrice;
    @Basic(optional = false)
    @Column(name = "cost_price")
    private BigDecimal costPrice;
    @JoinColumn(name = "item", referencedColumnName = "index_no")
    @ManyToOne(optional = false)
    private MItem item;

    public MItemUnit() {
    }

    public MItemUnit(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MItemUnit(Integer indexNo, String name, BigDecimal qty, BigDecimal salesPrice, BigDecimal costPrice) {
        this.indexNo = indexNo;
        this.name = name;
        this.qty = qty;
        this.salesPrice = salesPrice;
        this.costPrice = costPrice;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getQty() {
        return qty;
    }

    public void setQty(BigDecimal qty) {
        this.qty = qty;
    }

    public BigDecimal getSalesPrice() {
        return salesPrice;
    }

    public void setSalesPrice(BigDecimal salesPrice) {
        this.salesPrice = salesPrice;
    }

    public BigDecimal getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }

    public MItem getItem() {
        return item;
    }

    public void setItem(MItem item) {
        this.item = item;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (indexNo != null ? indexNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MItemUnit)) {
            return false;
        }
        MItemUnit other = (MItemUnit) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MItemUnits[ indexNo=" + indexNo + " ]";
    }
    
    
}
