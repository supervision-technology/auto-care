/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.item;

import com.mac.gl.master.model.brand.MBrand;
import com.mac.gl.master.model.category.MCategory;
import com.mac.gl.master.model.subCategory.MSubCategory;
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

    public MItem() {
    }

    public MItem(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MItem(Integer indexNo, String name, String barcode, String printDescription, String unit, BigDecimal salePrice, BigDecimal costPrice, String type, Integer branch, MItemDepartment department, MCategory category, MBrand brand, MSubCategory subCategory) {
        this.indexNo = indexNo;
        this.name = name;
        this.barcode = barcode;
        this.printDescription = printDescription;
        this.unit = unit;
        this.salesPrice = salePrice;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (indexNo != null ? indexNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MItem)) {
            return false;
        }
        MItem other = (MItem) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MItem[ indexNo=" + indexNo + " ]";
    }   
}
