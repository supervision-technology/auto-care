/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.sms_message.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kavish manjitha
 */
@Entity
@Table(name = "m_sms_details")
public class MSmsDetails implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "static_name")
    private String staticName;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 320)
    @Column(name = "message")
    private String message;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "api_key")
    private String apKey;

    public MSmsDetails() {
    }

    public MSmsDetails(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public MSmsDetails(Integer indexNo, String staticName, String message, String apKey) {
        this.indexNo = indexNo;
        this.staticName = staticName;
        this.message = message;
        this.apKey = apKey;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getStaticName() {
        return staticName;
    }

    public void setStaticName(String staticName) {
        this.staticName = staticName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getApKey() {
        return apKey;
    }

    public void setApKey(String apKey) {
        this.apKey = apKey;
    }

}
