/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_attendance.model;

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
 * @author L T430
 */
@Entity
@Table(name = "t_employee_attendance")
public class TEmployeeAttendance implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Basic(optional = false)
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Basic(optional = false)
    @Column(name = "in_time")
    @Temporal(TemporalType.TIME)
    private Date inTime;
    
    @Basic(optional = false)
    @Column(name = "out_time")
    @Temporal(TemporalType.TIME)
    private Date outTime;
    
    @Column(name = "current_bay")
    private Integer currentBay;
    
    @Column(name = "employee")
    private Integer employee;

    public TEmployeeAttendance() {
    }

    public TEmployeeAttendance(Integer indexNo, Date date, Date inTime, Date outTime, Integer currentBay, Integer employee) {
        this.indexNo = indexNo;
        this.date = date;
        this.inTime = inTime;
        this.outTime = outTime;
        this.currentBay = currentBay;
        this.employee = employee;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getInTime() {
        return inTime;
    }

    public void setInTime(Date inTime) {
        this.inTime = inTime;
    }

    public Date getOutTime() {
        return outTime;
    }

    public void setOutTime(Date outTime) {
        this.outTime = outTime;
    }

    public Integer getCurrentBay() {
        return currentBay;
    }

    public void setCurrentBay(Integer currentBay) {
        this.currentBay = currentBay;
    }

    public Integer getEmployee() {
        return employee;
    }

    public void setEmployee(Integer employee) {
        this.employee = employee;
    }

    
   
    
}
