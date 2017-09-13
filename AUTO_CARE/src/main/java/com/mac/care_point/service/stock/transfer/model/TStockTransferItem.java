/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.stock.transfer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_stock_transfer_item")
@XmlRootElement
public class TStockTransferItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "cost")
    private BigDecimal cost;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "qty")
    private BigDecimal qty;
    
    @NotNull
    @Column(name = "item")
    private Integer item;
    
    @JsonIgnore
    @JoinColumn(name = "stock_transfer", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TStockTransfer stockTransfer;

    public TStockTransferItem() {
    }

    public TStockTransferItem(Integer indexNo, BigDecimal cost, BigDecimal qty, Integer item, TStockTransfer stockTransfer) {
        this.indexNo = indexNo;
        this.cost = cost;
        this.qty = qty;
        this.item = item;
        this.stockTransfer = stockTransfer;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public BigDecimal getQty() {
        return qty;
    }

    public void setQty(BigDecimal qty) {
        this.qty = qty;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public TStockTransfer getStockTransfer() {
        return stockTransfer;
    }

    public void setStockTransfer(TStockTransfer stockTransfer) {
        this.stockTransfer = stockTransfer;
    }

   
}
