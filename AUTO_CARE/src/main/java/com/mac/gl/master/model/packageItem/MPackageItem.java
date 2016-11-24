/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.packageItem;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mac.gl.master.model.item.MItem;
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
import javax.validation.constraints.NotNull;

/**
 *
 * @author Nidura Prageeth
 */
@Entity
@Table(name = "r_package_item")
public class MPackageItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @NotNull
    @Basic(optional = false)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item")
    private MItem item;

    @NotNull
    @Basic(optional = false)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "package")
    private MItem packages;

    public MPackageItem() {
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MItem getItem() {
        return item;
    }

    public void setItem(MItem item) {
        this.item = item;
    }

    public MItem getPackages() {
        return packages;
    }

    public void setPackages(MItem packags) {
        this.packages = packags;
    }

    @Override
    public String toString() {
        return "MPackageItem{" + "indexNo=" + indexNo + ", item=" + item + ", packages=" + packages + '}';
    }

}
