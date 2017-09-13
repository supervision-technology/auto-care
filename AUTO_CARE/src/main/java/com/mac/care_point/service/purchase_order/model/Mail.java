/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.purchase_order.model;

import java.io.Serializable;

/**
 *
 * @author L T430
 */
public class Mail implements Serializable{
    
    private Integer indexNo;
    private String email;
    private String message;
    private String subject;

    public Mail() {
    }

    public Mail(Integer indexNo, String email, String message, String subject) {
        this.indexNo = indexNo;
        this.email = email;
        this.message = message;
        this.subject = subject;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
    
}
