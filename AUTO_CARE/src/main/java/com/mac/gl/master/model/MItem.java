/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "m_item")
public class MItem implements Serializable {

    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "index_no")
    private Integer indexNo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "name")
    private String name;
    @Size(max = 25)
    @Column(name = "barcode")
    private String barcode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "print_description")
    private String printDescription;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "unit")
    private String unit;
    @Basic(optional = false)
    @NotNull
    @Column(name = "sales_price")
    private short salesPrice;
    @Basic(optional = false)
    @NotNull
    @Column(name = "cost_price")
    private short costPrice;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "type")
    private String type;
    @Column(name = "branh")
    private Integer branh;

    public MItem() {
    }

    public MItem(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MItem(Integer indexNo, String name, String printDescription, String unit, short salesPrice, short costPrice, String type) {
        this.indexNo = indexNo;
        this.name = name;
        this.printDescription = printDescription;
        this.unit = unit;
        this.salesPrice = salesPrice;
        this.costPrice = costPrice;
        this.type = type;
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

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getPrintDescription() {
        return printDescription;
    }

    public void setPrintDescription(String printDescription) {
        this.printDescription = printDescription;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public short getSalesPrice() {
        return salesPrice;
    }

    public void setSalesPrice(short salesPrice) {
        this.salesPrice = salesPrice;
    }

    public short getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(short costPrice) {
        this.costPrice = costPrice;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getBranh() {
        return branh;
    }

    public void setBranh(Integer branh) {
        this.branh = branh;
    }
}
