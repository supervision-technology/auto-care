/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.item.model;

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
@Entity(name = "com.mac.care_point.master.item.model.MItem")
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

    public MItem(Integer indexNo) {
        this.indexNo = indexNo;
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

    /**
     * @return the indexNo
     */
    public Integer getIndexNo() {
        return indexNo;
    }

    /**
     * @param indexNo the indexNo to set
     */
    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the barcode
     */
    public String getBarcode() {
        return barcode;
    }

    /**
     * @param barcode the barcode to set
     */
    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    /**
     * @return the printDescription
     */
    public String getPrintDescription() {
        return printDescription;
    }

    /**
     * @param printDescription the printDescription to set
     */
    public void setPrintDescription(String printDescription) {
        this.printDescription = printDescription;
    }

    /**
     * @return the unit
     */
    public String getUnit() {
        return unit;
    }

    /**
     * @param unit the unit to set
     */
    public void setUnit(String unit) {
        this.unit = unit;
    }

    /**
     * @return the salesPrice
     */
    public BigDecimal getSalesPrice() {
        return salesPrice;
    }

    /**
     * @param salesPrice the salesPrice to set
     */
    public void setSalesPrice(BigDecimal salesPrice) {
        this.salesPrice = salesPrice;
    }

    /**
     * @return the costPrice
     */
    public BigDecimal getCostPrice() {
        return costPrice;
    }

    /**
     * @param costPrice the costPrice to set
     */
    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }

    /**
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return the branch
     */
    public Integer getBranch() {
        return branch;
    }

    /**
     * @param branch the branch to set
     */
    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    /**
     * @return the department
     */
    public Integer getDepartment() {
        return department;
    }

    /**
     * @param department the department to set
     */
    public void setDepartment(Integer department) {
        this.department = department;
    }

    /**
     * @return the category
     */
    public Integer getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(Integer category) {
        this.category = category;
    }

    /**
     * @return the brand
     */
    public Integer getBrand() {
        return brand;
    }

    /**
     * @param brand the brand to set
     */
    public void setBrand(Integer brand) {
        this.brand = brand;
    }

    /**
     * @return the subCategory
     */
    public Integer getSubCategory() {
        return subCategory;
    }

    /**
     * @param subCategory the subCategory to set
     */
    public void setSubCategory(Integer subCategory) {
        this.subCategory = subCategory;
    }

}
