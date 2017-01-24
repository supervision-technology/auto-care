/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.model.item;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mac.care_point.master.model.brand.MBrand;
import com.mac.care_point.master.model.category.MCategory;
import com.mac.care_point.master.model.subCategory.MSubCategory;
import com.mac.care_point.master.model.itemdepartment.MItemDepartment;
import com.mac.care_point.service.jobCard.model.TJobItem;
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

    @JoinColumn(name = "department", referencedColumnName = "index_no")
    @ManyToOne(fetch = FetchType.LAZY)
    private MItemDepartment department;

    @JoinColumn(name = "category", referencedColumnName = "index_no")
    @ManyToOne(fetch = FetchType.LAZY)
    private MCategory category;

    @JoinColumn(name = "brand", referencedColumnName = "index_no")
    @ManyToOne(fetch = FetchType.LAZY)
    private MBrand brand;

    @JoinColumn(name = "sub_category", referencedColumnName = "index_no")
    @ManyToOne(fetch = FetchType.LAZY)
    private MSubCategory subCategory;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "item", fetch = FetchType.EAGER)
    private List<TJobItem> tJobItemList;

    public MItem() {
    }

    public MItem(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MItem(Integer indexNo, String name, String barcode, String printDescription, String unit, BigDecimal salesPrice, BigDecimal costPrice, String type, Integer branch, MItemDepartment department, MCategory category, MBrand brand, MSubCategory subCategory, List<TJobItem> tJobItemList) {
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
        this.tJobItemList = tJobItemList;
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

    public MItemDepartment getDepartment() {
        return department;
    }

    public void setDepartment(MItemDepartment department) {
        this.department = department;
    }

    public MCategory getCategory() {
        return category;
    }

    public void setCategory(MCategory category) {
        this.category = category;
    }

    public MBrand getBrand() {
        return brand;
    }

    public void setBrand(MBrand brand) {
        this.brand = brand;
    }

    public MSubCategory getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(MSubCategory subCategory) {
        this.subCategory = subCategory;
    }

    public List<TJobItem> gettJobItemList() {
        return tJobItemList;
    }

    public void settJobItemList(List<TJobItem> tJobItemList) {
        this.tJobItemList = tJobItemList;
    }

}
