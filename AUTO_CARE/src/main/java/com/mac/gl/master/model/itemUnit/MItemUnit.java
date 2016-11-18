/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.itemUnit;

import com.mac.gl.master.model.item.MItem;
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

    @NotNull
    @Basic(optional = false)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item")
    private MItem item;

    @NotNull
    @Basic(optional = false)
    @Column(name = "name")
    private String name;

    @NotNull
    @Basic(optional = false)
    @Column(name = "qty")
    private double qty;

    @NotNull
    @Basic(optional = false)
    @Column(name = "sales_price")
    private double salePrice;

    @NotNull
    @Basic(optional = false)
    @Column(name = "cost_price")
    private double costPrice;

    public MItemUnit() {
    }

    public MItemUnit(Integer indexNo) {
        this.indexNo = indexNo;
    }

    
    @Override
    public String toString() {
        return "ItemUnit{" + "indexNo=" + indexNo + ", item=" + item + ", name=" + name + ", qty=" + qty + ", salePrice=" + salePrice + ", costPrice=" + costPrice + '}';
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MItem getItem() {
        return item;
    }

    public void setItem(MItem item) {
        this.item = item;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getQty() {
        return qty;
    }

    public void setQty(double qty) {
        this.qty = qty;
    }

    public double getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(double salePrice) {
        this.salePrice = salePrice;
    }

    public double getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(double costPrice) {
        this.costPrice = costPrice;
    }

}
