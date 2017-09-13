/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card.model;

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
@Table(name = "t_price_category_change_details")
public class TPriceCategoryChangeDetails implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "inde_no")
    private Integer indeNo;
    
    @Column(name = "vehicle")
    private Integer vehicel;
    
    @Column(name = "old_price_category")
    private Integer oldPriceCategory;
    
    @Column(name = "new_price_category")
    private Integer newPriceCategory;
    
    @Column(name = "reponceble_employee")
    private Integer reponcebleEmployee;
    
    @Column(name = "job_card")
    private Integer jobCard;

    public TPriceCategoryChangeDetails() {
    }

    public TPriceCategoryChangeDetails(Integer indeNo, Integer vehicel, Integer oldPriceCategory, Integer newPriceCategory, Integer reponcebleEmployee, Integer jobCard) {
        this.indeNo = indeNo;
        this.vehicel = vehicel;
        this.oldPriceCategory = oldPriceCategory;
        this.newPriceCategory = newPriceCategory;
        this.reponcebleEmployee = reponcebleEmployee;
        this.jobCard = jobCard;
    }

    public Integer getIndeNo() {
        return indeNo;
    }

    public void setIndeNo(Integer indeNo) {
        this.indeNo = indeNo;
    }

    public Integer getVehicel() {
        return vehicel;
    }

    public void setVehicel(Integer vehicel) {
        this.vehicel = vehicel;
    }

    public Integer getOldPriceCategory() {
        return oldPriceCategory;
    }

    public void setOldPriceCategory(Integer oldPriceCategory) {
        this.oldPriceCategory = oldPriceCategory;
    }

    public Integer getNewPriceCategory() {
        return newPriceCategory;
    }

    public void setNewPriceCategory(Integer newPriceCategory) {
        this.newPriceCategory = newPriceCategory;
    }

    public Integer getReponcebleEmployee() {
        return reponcebleEmployee;
    }

    public void setReponcebleEmployee(Integer reponcebleEmployee) {
        this.reponcebleEmployee = reponcebleEmployee;
    }

    public Integer getJobCard() {
        return jobCard;
    }

    public void setJobCard(Integer jobCard) {
        this.jobCard = jobCard;
    }

    @Override
    public String toString() {
        return "TPriceCategoryChangeDetails{" + "indeNo=" + indeNo + ", vehicel=" + vehicel + ", oldPriceCategory=" + oldPriceCategory + ", newPriceCategory=" + newPriceCategory + ", reponcebleEmployee=" + reponcebleEmployee + ", jobCard=" + jobCard + '}';
    }
    
}
