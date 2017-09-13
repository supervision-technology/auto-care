/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author my
 */
@Entity
@Table(name = "t_appointment")
public class TAppointment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index_no")
    @Basic(optional = false)
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "m_appointment_item")
    private Integer item;
   
    @Basic(optional = false)
    @Column(name = "price_category")
    private Integer priceCategory;

    @Basic(optional = false)
    @Column(name = "vehicle")
    private Integer vehicle;

    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;

    @Basic(optional = false)
    @Column(name = "received_date")
    private Date receivedDate;

    @Basic(optional = false)
    @Column(name = "appointment_date")
    private Date appointmentDate;

    @Basic(optional = false)
    @Column(name = "in_time")
    private String inTime;

    @Basic(optional = false)
    @Size(min = 1, max = 50)
    @Column(name = "client_name")
    private String clientName;

    @Basic(optional = false)
    @Size(min = 1, max = 25)
    @Column(name = "contact_no")
    private String contactNo;

    @Basic(optional = false)
    @Size(min = 1, max = 25)
    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Basic(optional = false)
    @Size(min = 1, max = 50)
    @Column(name = "vehicle_model")
    private String vehicleModel;

    @Basic(optional = false)
    @Column(name = "status")
    private int status;
 

    public TAppointment() {
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

    public Integer getPriceCategory() {
        return priceCategory;
    }

    public void setPriceCategory(Integer priceCategory) {
        this.priceCategory = priceCategory;
    }

    public Integer getVehicle() {
        return vehicle;
    }

    public void setVehicle(Integer vehicle) {
        this.vehicle = vehicle;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }

    public Date getReceivedDate() {
        return receivedDate;
    }

    public void setReceivedDate(Date receivedDate) {
        this.receivedDate = receivedDate;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getInTime() {
        return inTime;
    }

    public void setInTime(String inTime) {
        this.inTime = inTime;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }  

}
