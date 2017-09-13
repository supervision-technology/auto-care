/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.vehicle_attenctions.model;

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
 * @author kavish manjitha
 */
@Entity
@Table(name = "t_job_vehicle_attenctions")
public class TJobVehicleAttenctions implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "job_card")
    private Integer jobCard;

    @Basic(optional = false)
    @NotNull
    @Column(name = "vehicle_attenctions")
    private Integer vehicleAttenctions;

    @Basic(optional = false)
    @NotNull
    @Column(name = "vehicle_attenctions_category")
    private Integer vehicleAttenctionsCategory;

    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    @Basic(optional = false)
    @Column(name = "remark")
    private String remark;

    public TJobVehicleAttenctions() {
    }

    public TJobVehicleAttenctions(Integer indexNo, Integer jobCard, Integer vehicleAttenctions, Integer vehicleAttenctionsCategory, String status, String remark) {
        this.indexNo = indexNo;
        this.jobCard = jobCard;
        this.vehicleAttenctions = vehicleAttenctions;
        this.vehicleAttenctionsCategory = vehicleAttenctionsCategory;
        this.status = status;
        this.remark = remark;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getJobCard() {
        return jobCard;
    }

    public void setJobCard(Integer jobCard) {
        this.jobCard = jobCard;
    }

    public Integer getVehicleAttenctions() {
        return vehicleAttenctions;
    }

    public void setVehicleAttenctions(Integer vehicleAttenctions) {
        this.vehicleAttenctions = vehicleAttenctions;
    }

    public Integer getVehicleAttenctionsCategory() {
        return vehicleAttenctionsCategory;
    }

    public void setVehicleAttenctionsCategory(Integer vehicleAttenctionsCategory) {
        this.vehicleAttenctionsCategory = vehicleAttenctionsCategory;
    }

}
