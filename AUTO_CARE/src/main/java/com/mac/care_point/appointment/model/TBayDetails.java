/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment.model;

import com.mac.care_point.service.zmaster.vehicle.model.MVehicle;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author my
 */
@Entity
@Table(name = "t_bay_details")
public class TBayDetails implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index_no")
    @Basic(optional = false)
    private int indexNo;

    @NotNull
    @Basic(optional = false)
    @JoinColumn(name = "m_vehicle")
    @ManyToOne(fetch = FetchType.EAGER)
    private MVehicle vehicle;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "m_appointment_item")
    private int appointmentItem;
   
    @NotNull
    @Basic(optional = false)
    @JoinColumn(name = "m_appointment_bay")
    @ManyToOne(fetch = FetchType.EAGER)
    private MAppointmentBay appointmentBay;
   
    @Basic(optional = false)
    @Column(name = "in_time")
    private String inTime;
    
    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;
    
    @Basic(optional = false)
    @Column(name = "date")
    private Date date;

    public TBayDetails() {
    }

    public int getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(int indexNo) {
        this.indexNo = indexNo;
    }

    public MVehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(MVehicle vehicle) {
        this.vehicle = vehicle;
    }

    public int getAppointmentItem() {
        return appointmentItem;
    }

    public void setAppointmentItem(int appointmentItem) {
        this.appointmentItem = appointmentItem;
    }

    public MAppointmentBay getAppointmentBay() {
        return appointmentBay;
    }

    public void setAppointmentBay(MAppointmentBay appointmentBay) {
        this.appointmentBay = appointmentBay;
    }

    public String getInTime() {
        return inTime;
    }

    public void setInTime(String inTime) {
        this.inTime = inTime;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "TBayDetails{" + "indexNo=" + indexNo + ", vehicle=" + vehicle + ", appointmentItem=" + appointmentItem + ", appointmentBay=" + appointmentBay + ", inTime=" + inTime + ", branch=" + branch + ", date=" + date + '}';
    }

    
   
    
}
