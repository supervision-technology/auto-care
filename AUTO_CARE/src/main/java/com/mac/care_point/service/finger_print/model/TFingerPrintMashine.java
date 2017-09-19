/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.finger_print.model;

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
 * @author 'Kasun Chamara'
 */
@Entity
@Table(name = "t_finger_print_mashine")
public class TFingerPrintMashine implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "finger_print")
    private int fingerPrint;

    @Column(name = "branch")
    private Integer branch;
    
    @Column(name = "name")
    private String name;

    public TFingerPrintMashine() {
    }

    public TFingerPrintMashine(Integer indexNo, int fingerPrint, Integer branch, String name) {
        this.indexNo = indexNo;
        this.fingerPrint = fingerPrint;
        this.branch = branch;
        this.name = name;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public int getFingerPrint() {
        return fingerPrint;
    }

    public void setFingerPrint(int fingerPrint) {
        this.fingerPrint = fingerPrint;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    
    

}
