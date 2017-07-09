/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.item_category.model;

import java.io.Serializable;
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
@Table(name = "m_item_caregory")
public class MItemCategory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "view_approve")
    private Boolean viewApprove;
    
    @Column(name = "color")
    private String color;

    public MItemCategory() {
    }

    public MItemCategory(Integer indexNo, String name, Boolean viewApprove, String color) {
        this.indexNo = indexNo;
        this.name = name;
        this.viewApprove = viewApprove;
        this.color = color;
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

    public Boolean getViewApprove() {
        return viewApprove;
    }

    public void setViewApprove(Boolean viewApprove) {
        this.viewApprove = viewApprove;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
