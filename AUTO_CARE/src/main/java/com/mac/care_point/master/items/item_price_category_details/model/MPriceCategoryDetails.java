/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_price_category_details.model;

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
 * @author kavish manjitha
 */
@Entity
@Table(name = "m_price_category_details")
public class MPriceCategoryDetails implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Column(name = "price_category")
    private Integer priceCategory;
    
    @Column(name = "item")
    private Integer item;
    
    @Column(name = "normal_price")
    private BigDecimal normalPrice;
    
    @Column(name = "register_price")
    private BigDecimal registerPrice;

    public MPriceCategoryDetails() {
    }

    public MPriceCategoryDetails(Integer indexNo, Integer priceCategory, Integer item, BigDecimal normalPrice, BigDecimal registerPrice) {
        this.indexNo = indexNo;
        this.priceCategory = priceCategory;
        this.item = item;
        this.normalPrice = normalPrice;
        this.registerPrice = registerPrice;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getPriceCategory() {
        return priceCategory;
    }

    public void setPriceCategory(Integer priceCategory) {
        this.priceCategory = priceCategory;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public BigDecimal getNormalPrice() {
        return normalPrice;
    }

    public void setNormalPrice(BigDecimal normalPrice) {
        this.normalPrice = normalPrice;
    }

    public BigDecimal getRegisterPrice() {
        return registerPrice;
    }

    public void setRegisterPrice(BigDecimal registerPrice) {
        this.registerPrice = registerPrice;
    }
    
}
