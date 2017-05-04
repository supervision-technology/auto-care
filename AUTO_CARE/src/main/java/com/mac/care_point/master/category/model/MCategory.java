/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.category.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "m_category")
public class MCategory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @NotNull
    @Column(name = "colour")
    private String colour;

    @Basic(optional = false)
    @NotNull
    @Column(name = "view_approve")
    private Boolean viewApprove;

    @Basic(optional = false)
    @NotNull
    @Column(name = "static_feild")
    private Boolean staticFeild;

    @Basic(optional = false)
    @NotNull
    @Column(name = "static_feild_name")
    private String staticFeildName;

    @Basic(optional = false)
    @NotNull
    @Column(name = "image")
    private String image;

    public MCategory() {
    }

    public MCategory(Integer indexNo, String name, String colour, Boolean viewApprove, Boolean staticFeild, String staticFeildName, String image) {
        this.indexNo = indexNo;
        this.name = name;
        this.colour = colour;
        this.viewApprove = viewApprove;
        this.staticFeild = staticFeild;
        this.staticFeildName = staticFeildName;
        this.image = image;
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

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public Boolean getViewApprove() {
        return viewApprove;
    }

    public void setViewApprove(Boolean viewApprove) {
        this.viewApprove = viewApprove;
    }

    public Boolean getStaticFeild() {
        return staticFeild;
    }

    public void setStaticFeild(Boolean staticFeild) {
        this.staticFeild = staticFeild;
    }

    public String getStaticFeildName() {
        return staticFeildName;
    }

    public void setStaticFeildName(String staticFeildName) {
        this.staticFeildName = staticFeildName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
