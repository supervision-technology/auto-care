/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.model.packageItem;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mac.care_point.master.model.item.MItem;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "r_package_item")
@JsonIgnoreProperties(ignoreUnknown = true)
public class MPackageItem implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @JoinColumn(name = "package", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MItem packages;
    
    @JoinColumn(name = "item", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MItem item;

    public MPackageItem() {
    }

    public MPackageItem(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MPackageItem(Integer indexNo, MItem packages, MItem item) {
        this.indexNo = indexNo;
        this.packages = packages;
        this.item = item;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MItem getPackages() {
        return packages;
    }

    public void setPackages(MItem packages) {
        this.packages = packages;
    }

    public MItem getItem() {
        return item;
    }

    public void setItem(MItem item) {
        this.item = item;
    }

    
}
