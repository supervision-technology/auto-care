/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.daily_check_list.model;

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
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Kalum
 */
@Entity
@Table(name = "t_sub_item_check_result")
@XmlRootElement
public class TSubItemCheckResult implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @NotNull
    @Column(name = "checked")
    private boolean checked;

    @Size(max = 50)
    @Column(name = "reason")
    private String reason;

    @Column(name = "comfirmation")
    private Boolean comfirmation;

    @Column(name = "sub_item")
    private Integer subItem;

    @Size(max = 25)
    @Column(name = "time")
    private String time;

    @Column(name = "daily_check_list")
    private Integer dailyCheckList;

    public TSubItemCheckResult() {
    }

    public TSubItemCheckResult(Integer indexNo, boolean checked, String reason, Boolean comfirmation, Integer subItem, String time, Integer dailyCheckList) {
        this.indexNo = indexNo;
        this.checked = checked;
        this.reason = reason;
        this.comfirmation = comfirmation;
        this.subItem = subItem;
        this.time = time;
        this.dailyCheckList = dailyCheckList;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean getComfirmation() {
        return comfirmation;
    }

    public void setComfirmation(Boolean comfirmation) {
        this.comfirmation = comfirmation;
    }

    public Integer getSubItem() {
        return subItem;
    }

    public void setSubItem(Integer subItem) {
        this.subItem = subItem;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Integer getDailyCheckList() {
        return dailyCheckList;
    }

    public void setDailyCheckList(Integer dailyCheckList) {
        this.dailyCheckList = dailyCheckList;
    }

}
