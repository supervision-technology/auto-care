/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.jobCard.model;

import com.mac.care_point.master.item.MItem;
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
@Entity
@Table(name = "t_job_item")
public class TJobItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "package_item")
    private Integer packageItem;

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

    @Basic(optional = false)
    @Column(name = "form_customer")
    private boolean formCustomer;

    @Column(name = "job_card")
    private Integer jobCard;

    @Column(name = "item")
    private Integer item;

    public TJobItem() {
    }

    public TJobItem(Integer indexNo, Integer packageItem, short quantity, short price, short value, String orderStatus, String jobStatus, boolean formCustomer, Integer jobCard, Integer item) {
        this.indexNo = indexNo;
        this.packageItem = packageItem;
        this.quantity = quantity;
        this.price = price;
        this.value = value;
        this.orderStatus = orderStatus;
        this.jobStatus = jobStatus;
        this.formCustomer = formCustomer;
        this.jobCard = jobCard;
        this.item = item;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getPackageItem() {
        return packageItem;
    }

    public void setPackageItem(Integer packageItem) {
        this.packageItem = packageItem;
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

    public boolean isFormCustomer() {
        return formCustomer;
    }

    public void setFormCustomer(boolean formCustomer) {
        this.formCustomer = formCustomer;
    }

    public Integer getJobCard() {
        return jobCard;
    }

    public void setJobCard(Integer jobCard) {
        this.jobCard = jobCard;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }
}
