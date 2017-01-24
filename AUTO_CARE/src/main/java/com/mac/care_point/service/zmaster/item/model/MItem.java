/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.item.model;

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
 * @author Don
 */
@Entity(name = "com.mac.care_point.service.zmaster.item.MItem")
@Table(name = "m_item")
public class MItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "name")
    private String name;

    @Column(name = "barcode")
    private String barcode;

    @Column(name = "print_description")
    private String printDescription;

    @Column(name = "unit")
    private String unit;

    @Basic(optional = false)
    @Column(name = "sales_price")
    private BigDecimal salesPrice;

    @Column(name = "cost_price")
    private BigDecimal costPrice;

    @Basic(optional = false)
    @Column(name = "type")
    private String type;

    @Column(name = "branch")
    private Integer branch;

    @Column(name = "department")
    private Integer department;

    @Column(name = "category")
    private Integer category;

    @Column(name = "brand")
    private Integer brand;

    @Column(name = "sub_category")
    private Integer subCategory;

    public MItem() {
    }

    public MItem(Integer indexNo, String name, String barcode, String printDescription, String unit, BigDecimal salesPrice, BigDecimal costPrice, String type, Integer branch, Integer department, Integer category, Integer brand, Integer subCategory) {
        this.indexNo = indexNo;
        this.name = name;
        this.barcode = barcode;
        this.printDescription = printDescription;
        this.unit = unit;
        this.salesPrice = salesPrice;
        this.costPrice = costPrice;
        this.type = type;
        this.branch = branch;
        this.department = department;
        this.category = category;
        this.brand = brand;
        this.subCategory = subCategory;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public Integer getDepartment() {
        return department;
    }

    public void setDepartment(Integer department) {
        this.department = department;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public Integer getBrand() {
        return brand;
    }

    public void setBrand(Integer brand) {
        this.brand = brand;
    }

    public Integer getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(Integer subCategory) {
        this.subCategory = subCategory;
    }
}
