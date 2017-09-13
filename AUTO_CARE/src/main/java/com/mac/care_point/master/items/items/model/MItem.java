/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.items.model;

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
 * @author Kavish Manjitha
 */
@Entity
@Table(name = "m_item")
public class MItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "name")
    private String name;

    @Column(name = "barcode")
    private String barcode;

    @Column(name = "print_description")
    private String printDescription;

    @Column(name = "unit")
    private String unit;

    @Column(name = "type")
    private String type;

    @Column(name = "department")
    private Integer department;

    @Column(name = "brand")
    private Integer brand;

    @Column(name = "category")
    private Integer category;

    @Column(name = "item_category")
    private Integer itemCategory;

    @Column(name = "sub_category")
    private Integer sub_category;

    @Column(name = "cost_price")
    private BigDecimal costPrice;

    @Column(name = "sale_price_normal")
    private BigDecimal salePriceNormal;

    @Column(name = "sale_price_register")
    private BigDecimal salePriceRegister;

    @Column(name = "price_category")
    private Integer priceCategory;

    @Column(name = "supplier")
    private Integer supplier;

    @Column(name = "re_order_max")
    private BigDecimal reOrderMax;

    @Column(name = "re_order_min")
    private BigDecimal reOrderMin;

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "supplier_price")
    private BigDecimal supplierPrice;

    @Column(name = "qty_wise")
    private Boolean qtyWise;

    public MItem() {
    }

    public MItem(Integer indexNo, String name, String barcode, String printDescription, String unit, String type, Integer department, Integer brand, Integer category, Integer itemCategory, Integer sub_category, BigDecimal costPrice, BigDecimal salePriceNormal, BigDecimal salePriceRegister, Integer priceCategory, Integer supplier, BigDecimal reOrderMax, BigDecimal reOrderMin, BigDecimal discount, BigDecimal supplierPrice, Boolean qtyWise) {
        this.indexNo = indexNo;
        this.name = name;
        this.barcode = barcode;
        this.printDescription = printDescription;
        this.unit = unit;
        this.type = type;
        this.department = department;
        this.brand = brand;
        this.category = category;
        this.itemCategory = itemCategory;
        this.sub_category = sub_category;
        this.costPrice = costPrice;
        this.salePriceNormal = salePriceNormal;
        this.salePriceRegister = salePriceRegister;
        this.priceCategory = priceCategory;
        this.supplier = supplier;
        this.reOrderMax = reOrderMax;
        this.reOrderMin = reOrderMin;
        this.discount = discount;
        this.supplierPrice = supplierPrice;
        this.qtyWise = qtyWise;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getDepartment() {
        return department;
    }

    public void setDepartment(Integer department) {
        this.department = department;
    }

    public Integer getBrand() {
        return brand;
    }

    public void setBrand(Integer brand) {
        this.brand = brand;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public Integer getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(Integer itemCategory) {
        this.itemCategory = itemCategory;
    }

    public Integer getSub_category() {
        return sub_category;
    }

    public void setSub_category(Integer sub_category) {
        this.sub_category = sub_category;
    }

    public BigDecimal getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
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

    public Integer getPriceCategory() {
        return priceCategory;
    }

    public void setPriceCategory(Integer priceCategory) {
        this.priceCategory = priceCategory;
    }

    public Integer getSupplier() {
        return supplier;
    }

    public void setSupplier(Integer supplier) {
        this.supplier = supplier;
    }

    public BigDecimal getReOrderMax() {
        return reOrderMax;
    }

    public void setReOrderMax(BigDecimal reOrderMax) {
        this.reOrderMax = reOrderMax;
    }

    public BigDecimal getReOrderMin() {
        return reOrderMin;
    }

    public void setReOrderMin(BigDecimal reOrderMin) {
        this.reOrderMin = reOrderMin;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getSupplierPrice() {
        return supplierPrice;
    }

    public void setSupplierPrice(BigDecimal supplierPrice) {
        this.supplierPrice = supplierPrice;
    }

    public Boolean getQtyWise() {
        return qtyWise;
    }

    public void setQtyWise(Boolean qtyWise) {
        this.qtyWise = qtyWise;
    }

}
