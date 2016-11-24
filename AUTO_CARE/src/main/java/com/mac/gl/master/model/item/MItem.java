/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.item;

import com.mac.gl.master.model.brand.MBrand;
import com.mac.gl.master.model.category.MCategory;
import com.mac.gl.master.model.itemUnit.MItemUnit;
import com.mac.gl.master.model.subCategory.MSubCategory;
import com.mac.gl.master.model.itemdepartment.MItemDepartment;
import com.mac.gl.master.model.packageItem.MPackageItem;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "m_item")
public class MItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @NotNull
    @Basic(optional = false)
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @Column(name = "barcode")
    private String barcode;

    @Basic(optional = false)
    @Column(name = "print_description")
    private String printDescription;

    @Basic(optional = false)
    @Column(name = "unit")
    private String unit;

    @Basic(optional = false)
    @Column(name = "sales_price")
    private BigDecimal salePrice;

    @Basic(optional = false)
    @Column(name = "cost_price")
    private BigDecimal costPrice;

    @Basic(optional = false)
    @Column(name = "type")
    private String type;

    @JoinColumn(name = "department")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MItemDepartment itemDepartment;

    @JoinColumn(name = "brand")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MBrand brand;

    @JoinColumn(name = "category")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MCategory category;

    @JoinColumn(name = "sub_category")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MSubCategory subCategory;

    @NotNull
    @Column(name = "branch")
    private Integer branch;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "item", fetch = FetchType.EAGER)
    private List<MItemUnit> unitList;

    public MItem() {
    }

    public MItem(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MItem(Integer indexNo, String name, String barcode, String printDescription, String unit, BigDecimal salePrice, BigDecimal costPrice, String type, MItemDepartment itemDepartment, MBrand brand, MCategory category, MSubCategory subCategory, Integer branch, List<MItemUnit> unitList) {
        this.indexNo = indexNo;
        this.name = name;
        this.barcode = barcode;
        this.printDescription = printDescription;
        this.unit = unit;
        this.salePrice = salePrice;
        this.costPrice = costPrice;
        this.type = type;
        this.itemDepartment = itemDepartment;
        this.brand = brand;
        this.category = category;
        this.subCategory = subCategory;
        this.branch = branch;
        this.unitList = unitList;
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

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
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

    public MItemDepartment getItemDepartment() {
        return itemDepartment;
    }

    public void setItemDepartment(MItemDepartment itemDepartment) {
        this.itemDepartment = itemDepartment;
    }

    public MBrand getBrand() {
        return brand;
    }

    public void setBrand(MBrand brand) {
        this.brand = brand;
    }

    public MCategory getCategory() {
        return category;
    }

    public void setCategory(MCategory category) {
        this.category = category;
    }

    public MSubCategory getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(MSubCategory subCategory) {
        this.subCategory = subCategory;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    @XmlTransient
    public List<MItemUnit> getUnitList() {
        return unitList;
    }

    public void setUnitList(List<MItemUnit> unitList) {
        this.unitList = unitList;
    }

    @Override
    public String toString() {
        return "MItem{" + "indexNo=" + indexNo + ", name=" + name + ", barcode=" + barcode + ", printDescription=" + printDescription + ", unit=" + unit + ", salePrice=" + salePrice + ", costPrice=" + costPrice + ", type=" + type + ", itemDepartment=" + itemDepartment + ", brand=" + brand + ", category=" + category + ", subCategory=" + subCategory + ", branch=" + branch + ", unitList=" + unitList + '}';
    }
}
