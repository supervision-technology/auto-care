/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.consumable_item.model;

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
 * @author L T430
 */
@Entity
@Table(name = "r_consumable")
public class RConsumable implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Column(name = "service")
    private Integer service;
    
    @Column(name = "consumable")
    private Integer consumable;
    
    @Column(name = "qty")
    private BigDecimal qty;

    public RConsumable() {
        
    }

    public RConsumable(Integer indexNo, Integer service, Integer consumable, BigDecimal qty) {
        this.indexNo = indexNo;
        this.service = service;
        this.consumable = consumable;
        this.qty = qty;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getService() {
        return service;
    }

    public void setService(Integer service) {
        this.service = service;
    }

    public Integer getConsumable() {
        return consumable;
    }

    public void setConsumable(Integer consumable) {
        this.consumable = consumable;
    }

    public BigDecimal getQty() {
        return qty;
    }

    public void setQty(BigDecimal qty) {
        this.qty = qty;
    }

    
   
    
}
