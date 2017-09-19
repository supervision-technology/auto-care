/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.finger_print.model;

import java.io.Serializable;
import java.sql.Timestamp;
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
@Table(name = "ras_attrecord")
public class TFingerPrint implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    
    @Column(name = "DN")
    private Integer dn;
    
    @Column(name = "DIN")
    private Integer din;
    
    @Column(name = "Clock")
    private String clock; 
    

    public TFingerPrint() {
    }

    public TFingerPrint(Integer id, Integer dn, Integer din, String clock) {
        this.id = id;
        this.dn = dn;
        this.din = din;
        this.clock = clock;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDn() {
        return dn;
    }

    public void setDn(Integer dn) {
        this.dn = dn;
    }

    public Integer getDin() {
        return din;
    }

    public void setDin(Integer din) {
        this.din = din;
    }

    public String getClock() {
        return clock;
    }

    public void setClock(String clock) {
        this.clock = clock;
    }

   
    
}
