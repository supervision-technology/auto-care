/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.final_check_list.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author kavish manjitha
 */
@Entity
@Table(name = "t_job_final_check_list")
public class TJobFinalCheckList implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "`check`")
    private String check;

    @Column(name = "final_check_list_item")
    private Integer finalCheckListItem;

    @Column(name = "job_card")
    private Integer jobCard;

    @Column(name = "vehicle")
    private Integer vehicle;

    @Column(name = "date_time")
    @Temporal(TemporalType.DATE)
    private Date dateTime;

    public TJobFinalCheckList() {
    }

    public TJobFinalCheckList(Integer indexNo, String check, Integer finalCheckListItem, Integer jobCard, Integer vehicle, Date dateTime) {
        this.indexNo = indexNo;
        this.check = check;
        this.finalCheckListItem = finalCheckListItem;
        this.jobCard = jobCard;
        this.vehicle = vehicle;
        this.dateTime = dateTime;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getCheck() {
        return check;
    }

    public void setCheck(String check) {
        this.check = check;
    }

    public Integer getFinalCheckListItem() {
        return finalCheckListItem;
    }

    public void setFinalCheckListItem(Integer finalCheckListItem) {
        this.finalCheckListItem = finalCheckListItem;
    }

    public Integer getJobCard() {
        return jobCard;
    }

    public void setJobCard(Integer jobCard) {
        this.jobCard = jobCard;
    }

    public Integer getVehicle() {
        return vehicle;
    }

    public void setVehicle(Integer vehicle) {
        this.vehicle = vehicle;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

}
