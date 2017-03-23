/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.client.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import org.eclipse.persistence.sessions.serializers.Serializer;

/**
 *
 * @author Kalum
 */

@Entity(name = "com.mac.care_point.service.zmaster.client.model")
@Table(name = "m_client")
public class MClient implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Size(min = 1, max = 50)
    @Column(name = "name")
    private String name;

    @Basic(optional = false)

    @Size(min = 1, max = 100)
    @Column(name = "address_line1")
    private String addressLine1;

    @Basic(optional = false)
    @Size(min = 1, max = 50)
    @Column(name = "address_line2")
    private String addressLine2;

    @Basic(optional = false)
    @Size(min = 1, max = 50)
    @Column(name = "address_line3")
    private String addressLine3;

    @Basic(optional = false)
    @Size(min = 1, max = 25)
    @Column(name = "mobile")
    private String mobile;

    @Basic(optional = false)
    @Column(name = "branch")
    private int branch;

    @Basic(optional = false)
    @Size(min = 1, max = 25)
    @Column(name = "type")
    private String type;

    @Basic(optional = false)
    @Size(min = 1, max = 25)
    @Column(name = "nic")
    private String nic;

    public MClient() {
    }

    public MClient(Integer indexNo, String name, String addressLine1, String addressLine2, String addressLine3, String mobile, int branch, String type, String nic) {
        this.indexNo = indexNo;
        this.name = name;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.mobile = mobile;
        this.branch = branch;
        this.type = type;
        this.nic = nic;
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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }
    
    
    
}
