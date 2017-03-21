/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_unit.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Kavish Manjitha
 */
@Entity
@Table(name = "m_item_units")
public class MItemUnits implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "item")
    private Integer item;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @NotNull
    @Column(name = "qty")
    private short qty;

    @Basic(optional = false)
    @NotNull
    @Column(name = "sale_price_normal")
    private short salePriceNormal;

    @Basic(optional = false)
    @NotNull
    @Column(name = "sale_price_register")
    private short salePriceRegister;

    @Basic(optional = false)
    @NotNull
    @Column(name = "cost_price")
    private short costPrice;

    public MItemUnits() {
    }

    public MItemUnits(Integer indexNo, Integer item, String name, short qty, short salePriceNormal, short salePriceRegister, short costPrice) {
        this.indexNo = indexNo;
        this.item = item;
        this.name = name;
        this.qty = qty;
        this.salePriceNormal = salePriceNormal;
        this.salePriceRegister = salePriceRegister;
        this.costPrice = costPrice;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public short getQty() {
        return qty;
    }

    public void setQty(short qty) {
        this.qty = qty;
    }

    public short getSalePriceNormal() {
        return salePriceNormal;
    }

    public void setSalePriceNormal(short salePriceNormal) {
        this.salePriceNormal = salePriceNormal;
    }

    public short getSalePriceRegister() {
        return salePriceRegister;
    }

    public void setSalePriceRegister(short salePriceRegister) {
        this.salePriceRegister = salePriceRegister;
    }

    public short getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(short costPrice) {
        this.costPrice = costPrice;
    }
}
