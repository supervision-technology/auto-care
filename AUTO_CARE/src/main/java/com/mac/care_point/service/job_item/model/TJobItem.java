/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item.model;

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
@Table(name = "t_job_item")
public class TJobItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "item")
    private Integer item;

    @Column(name = "item_unit")
    private Integer itemUnit;

    @Column(name = "item_type")
    private String itemType;

    @Basic(optional = false)
    @Column(name = "quantity")
    private short quantity;

    @Basic(optional = false)
    @Column(name = "price")
    private short price;

    @Basic(optional = false)
    @Column(name = "value")
    private short value;

    @Basic(optional = false)
    @Column(name = "order_status")
    private String orderStatus;

    @Basic(optional = false)
    @Column(name = "job_status")
    private String jobStatus;

    @Column(name = "job_card")
    private Integer jobCard;

    public TJobItem() {
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public Integer getItemUnit() {
        return itemUnit;
    }

    public void setItemUnit(Integer itemUnit) {
        this.itemUnit = itemUnit;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public short getQuantity() {
        return quantity;
    }

    public void setQuantity(short quantity) {
        this.quantity = quantity;
    }

    public short getPrice() {
        return price;
    }

    public void setPrice(short price) {
        this.price = price;
    }

    public short getValue() {
        return value;
    }

    public void setValue(short value) {
        this.value = value;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    public Integer getJobCard() {
        return jobCard;
    }

    public void setJobCard(Integer jobCard) {
        this.jobCard = jobCard;
    }
}
