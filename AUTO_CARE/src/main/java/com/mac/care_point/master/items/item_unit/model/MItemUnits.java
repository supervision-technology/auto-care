/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_unit.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
    @Size(min = 1, max = 250)
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @NotNull
    @Column(name = "qty")
    private BigDecimal qty;

    @Basic(optional = false)
    @NotNull
    @Column(name = "sale_price_normal")
    private BigDecimal salePriceNormal;

    @Basic(optional = false)
    @NotNull
    @Column(name = "sale_price_register")
    private BigDecimal salePriceRegister;

    @Basic(optional = false)
    @NotNull
    @Column(name = "cost_price")
    private BigDecimal costPrice;

    @Basic(optional = false)
    @NotNull
    @Column(name = "item_unit_type")
    private String itemUnitType;

    public MItemUnits() {
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

    public BigDecimal getQty() {
        return qty;
    }

    public void setQty(BigDecimal qty) {
        this.qty = qty;
    }

    public BigDecimal getSalePriceNormal() {
        return salePriceNormal;
    }

    public void setSalePriceNormal(BigDecimal salePriceNormal) {
        this.salePriceNormal = salePriceNormal;
    }

    public BigDecimal getSalePriceRegister() {
        return salePriceRegister;
    }

    public void setSalePriceRegister(BigDecimal salePriceRegister) {
        this.salePriceRegister = salePriceRegister;
    }

    public BigDecimal getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }

    public String getItemUnitType() {
        return itemUnitType;
    }

    public void setItemUnitType(String itemUnitType) {
        this.itemUnitType = itemUnitType;
    }
}
