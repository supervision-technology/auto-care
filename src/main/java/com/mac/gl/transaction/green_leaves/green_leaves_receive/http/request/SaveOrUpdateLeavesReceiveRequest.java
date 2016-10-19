/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive.http.request;

import java.sql.Date;

/**
 *
 * @author Don
 */
public class SaveOrUpdateLeavesReceiveRequest {

    private Integer indexNo;
    private Date date;
    private Integer route;

    private Integer transaction;
    private Integer number;
    private Integer branch;

    private Double normalLeavesQuantity;
    private Integer client;
    private Double superLeavesQuantity;

    public SaveOrUpdateLeavesReceiveRequest() {
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getRoute() {
        return route;
    }

    public void setRoute(Integer route) {
        this.route = route;
    }

    public Integer getTransaction() {
        return transaction;
    }

    public void setTransaction(Integer transaction) {
        this.transaction = transaction;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public Double getNormalLeavesQuantity() {
        return normalLeavesQuantity;
    }

    public void setNormalLeavesQuantity(Double normalLeavesQuantity) {
        this.normalLeavesQuantity = normalLeavesQuantity;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public Double getSuperLeavesQuantity() {
        return superLeavesQuantity;
    }

    public void setSuperLeavesQuantity(Double superLeavesQuantity) {
        this.superLeavesQuantity = superLeavesQuantity;
    }

}
