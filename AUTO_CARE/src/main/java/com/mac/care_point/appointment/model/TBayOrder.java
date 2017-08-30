/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment.model;

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
 * @author my
 */
@Entity
@Table(name = "t_bay_order")
public class TBayOrder implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index_no")
    @Basic(optional = false)
    private int indexNo;

    @NotNull
    @Basic(optional = false)
    @Column(name = "m_appointment_item")
    private int appointmentItem;
   
    @NotNull
    @Basic(optional = false)
    @Column(name = "m_appointment_bay")
    private int appointmentBay;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "order")
    private int order;

    public TBayOrder() {
    }

    public int getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(int indexNo) {
        this.indexNo = indexNo;
    }

    public int getAppointmentItem() {
        return appointmentItem;
    }

    public void setAppointmentItem(int appointmentItem) {
        this.appointmentItem = appointmentItem;
    }

    public int getAppointmentBay() {
        return appointmentBay;
    }

    public void setAppointmentBay(int appointmentBay) {
        this.appointmentBay = appointmentBay;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
    
    
    
}
