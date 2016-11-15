/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.client;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

/**
 *
 * @author Supervision
 */
@Entity
@Table(name = "m_client")
public class MClient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "name")
    private String name;

    @Basic(optional = false)
    @NotNull
    @Column(name = "mobile_number")
    private String mobileNumber;

    @Basic(optional = false)
    @NotNull
    @Column(name = "nic_number")
    private String nicNumber;

    @Basic(optional = false)
    @Column(name = "telephone_number")
    private String telephoneNumber;

    @Basic(optional = false)
    @Column(name = "address_line1")
    private String addressLine1;

    @Basic(optional = false)
    @Column(name = "address_line2")
    private String addressLine2;

    @Basic(optional = false)
    @Column(name = "address_line3")
    private String addressLine3;
    
    @Basic(optional = false)
    @Column(name = "branch")
    private Integer branch;

    public MClient() {
    }

    public MClient(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MClient(Integer indexNo, String name, String mobileNumber, String nicNumber, String telephoneNumber, String addressLine1, String addressLine2, String addressLine3, Integer branch) {
        this.indexNo = indexNo;
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.nicNumber = nicNumber;
        this.telephoneNumber = telephoneNumber;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.branch = branch;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getAddressLine3() {
        return addressLine3;
    }

    public void setAddressLine3(String addressLine3) {
        this.addressLine3 = addressLine3;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

   
  
}
