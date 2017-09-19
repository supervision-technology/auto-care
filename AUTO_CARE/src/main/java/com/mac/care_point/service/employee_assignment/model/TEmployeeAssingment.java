/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_assignment.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author L T430
 */
@Entity
@Table(name = "t_employee_assingment")
public class TEmployeeAssingment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "in_time")
    private String inTime;

    @Column(name = "out_time")
    private String outTime;

    @Basic(optional = false)
    @Column(name = "status")
    private String status;

    @Column(name = "employee")
    private Integer employee;

    @Column(name = "bay")
    private Integer bay;

    @Column(name = "date")
    private String date;
   
    @Column(name = "is_out")
    private boolean isOut;

    public TEmployeeAssingment() {
    }

    public TEmployeeAssingment(Integer indexNo, String inTime, String outTime, String status, Integer employee, Integer bay, String date, boolean isOut) {
        this.indexNo = indexNo;
        this.inTime = inTime;
        this.outTime = outTime;
        this.status = status;
        this.employee = employee;
        this.bay = bay;
        this.date = date;
        this.isOut = isOut;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getInTime() {
        return inTime;
    }

    public void setInTime(String inTime) {
        this.inTime = inTime;
    }

    public String getOutTime() {
        return outTime;
    }

    public void setOutTime(String outTime) {
        this.outTime = outTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getEmployee() {
        return employee;
    }

    public void setEmployee(Integer employee) {
        this.employee = employee;
    }

    public Integer getBay() {
        return bay;
    }

    public void setBay(Integer bay) {
        this.bay = bay;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isIsOut() {
        return isOut;
    }

    public void setIsOut(boolean isOut) {
        this.isOut = isOut;
    }

   
    
}
