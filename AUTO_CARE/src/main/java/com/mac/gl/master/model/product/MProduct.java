/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.product;

import com.mac.gl.master.model.category.MCategory;
import com.mac.gl.master.model.subCategory.MSubCategory;
import com.mac.gl.master.model.supplier.MSupplier;
import com.mac.gl.master.model.itemdepartment.MItemDepartment;
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

/**
 *
 * @author Don
 */
@Entity
@Table(name = "m_product")
public class MProduct implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @Column(name = "print_description")
    private String printDescription;

    @Column(name = "branch")
    private Integer branch;

    @Column(name = "brand")
    private String brand;

    @Column(name = "unit")
    private String unit;

    @Column(name = "cost_price")
    private BigDecimal costPrice;

    @Column(name = "sale_price")
    private BigDecimal salePrice;

    @JoinColumn(name = "sub_category", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MSubCategory subCategory;

    @JoinColumn(name = "category", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MCategory category;

    @JoinColumn(name = "item_department", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MItemDepartment itemDepartment;

    @JoinColumn(name = "supplier", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MSupplier supplier;

    public MProduct() {
    }

    public MProduct(Integer indexNo, String name, String printDescription, Integer branch, String brand, String unit, BigDecimal costPrice, BigDecimal salePrice, MSubCategory subCategory, MCategory category, MItemDepartment itemDepartment, MSupplier supplier) {
        this.indexNo = indexNo;
        this.name = name;
        this.printDescription = printDescription;
        this.branch = branch;
        this.brand = brand;
        this.unit = unit;
        this.costPrice = costPrice;
        this.salePrice = salePrice;
        this.subCategory = subCategory;
        this.category = category;
        this.itemDepartment = itemDepartment;
        this.supplier = supplier;
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

    public String getPrintDescription() {
        return printDescription;
    }

    public void setPrintDescription(String printDescription) {
        this.printDescription = printDescription;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public MSubCategory getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(MSubCategory subCategory) {
        this.subCategory = subCategory;
    }

    public MCategory getCategory() {
        return category;
    }

    public void setCategory(MCategory category) {
        this.category = category;
    }

    public MItemDepartment getItemDepartment() {
        return itemDepartment;
    }

    public void setItemDepartment(MItemDepartment itemDepartment) {
        this.itemDepartment = itemDepartment;
    }

    public MSupplier getSupplier() {
        return supplier;
    }

    public void setSupplier(MSupplier supplier) {
        this.supplier = supplier;
    }

}
