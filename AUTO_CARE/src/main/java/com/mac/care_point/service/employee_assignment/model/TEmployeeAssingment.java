/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_assignment.model;

import com.mac.care_point.master.bay.model.Bay;
import com.mac.care_point.master.employee.model.Employee;
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
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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

    @JoinColumn(name = "employee", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Employee employee;

    @JoinColumn(name = "bay", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Bay bay;

    @Column(name = "date")
    private Date date;

    public TEmployeeAssingment() {
    }

    public TEmployeeAssingment(Integer indexNo, String inTime, String outTime, String status, Employee employee, Bay bay, Date date) {
        this.indexNo = indexNo;
        this.inTime = inTime;
        this.outTime = outTime;
        this.status = status;
        this.employee = employee;
        this.bay = bay;
        this.date = date;
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

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Bay getBay() {
        return bay;
    }

    public void setBay(Bay bay) {
        this.bay = bay;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

 
}
