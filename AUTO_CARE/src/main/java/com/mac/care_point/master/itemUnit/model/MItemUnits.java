/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.itemUnit.model;

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
    @Column(name = "sale_price_normal_cus")
    private short salePriceNormalCus;

    @Basic(optional = false)
    @NotNull
    @Column(name = "sale_price_register_cus")
    private short salePriceRegisterCus;

    @Basic(optional = false)
    @NotNull
    @Column(name = "cost_price")
    private short costPrice;

    public MItemUnits() {
    }

    public MItemUnits(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MItemUnits(Integer indexNo, Integer item, String name, short qty, short salePriceNormalCus, short salePriceRegisterCus, short costPrice) {
        this.indexNo = indexNo;
        this.item = item;
        this.name = name;
        this.qty = qty;
        this.salePriceNormalCus = salePriceNormalCus;
        this.salePriceRegisterCus = salePriceRegisterCus;
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

    public short getSalePriceNormalCus() {
        return salePriceNormalCus;
    }

    public void setSalePriceNormalCus(short salePriceNormalCus) {
        this.salePriceNormalCus = salePriceNormalCus;
    }

    public short getSalePriceRegisterCus() {
        return salePriceRegisterCus;
    }

    public void setSalePriceRegisterCus(short salePriceRegisterCus) {
        this.salePriceRegisterCus = salePriceRegisterCus;
    }

    public short getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(short costPrice) {
        this.costPrice = costPrice;
    }

}
