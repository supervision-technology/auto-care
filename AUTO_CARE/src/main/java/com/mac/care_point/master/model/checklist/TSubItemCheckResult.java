/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.model.checklist;

import com.mac.care_point.master.model.item.MSubItem;
import java.io.Serializable;
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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Don
 */
@Entity
@Table(name = "t_sub_item_check_result")
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

    @Size(max = 25)
    @Column(name = "time")
    private String time;

    @JoinColumn(name = "sub_item")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MSubItem subItem;

    @JoinColumn(name = "daily_check_list")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TDailyCleckList dailyCheckList;

    public TSubItemCheckResult() {
    }

    public TSubItemCheckResult(boolean checked, MSubItem subItem, TDailyCleckList dailyCheckList) {
        this.checked = checked;
        this.subItem = subItem;
        this.dailyCheckList = dailyCheckList;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public boolean getChecked() {
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public MSubItem getSubItem() {
        return subItem;
    }

    public void setSubItem(MSubItem subItem) {
        this.subItem = subItem;
    }

    public TDailyCleckList getDailyCheckList() {
        return dailyCheckList;
    }

    public void setDailyCheckList(TDailyCleckList dailyCheckList) {
        this.dailyCheckList = dailyCheckList;
    }
}
