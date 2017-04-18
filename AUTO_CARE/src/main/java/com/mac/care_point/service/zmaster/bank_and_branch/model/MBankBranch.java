/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.bank_and_branch.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

/**
 *
 * @author Kavish Manjitha
 */
@Entity
@Table(name = "m_bank_branch")
public class MBankBranch implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Size(max = 50)
    @Column(name = "bank")
    private String bank;

    @Size(max = 50)
    @Column(name = "name")
    private String name;

    @Size(max = 25)
    @Column(name = "code")
    private String code;

    public MBankBranch() {
    }

    public MBankBranch(Integer indexNo, String bank, String name, String code) {
        this.indexNo = indexNo;
        this.bank = bank;
        this.name = name;
        this.code = code;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
