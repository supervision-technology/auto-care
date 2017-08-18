/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment.model;

import com.mac.care_point.master.items.items.model.MItem;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author my
 */
@Entity
@Table(name = "m_appointment_item")
public class MAppointmentItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index_no")
    @Basic(optional = false)
    private int indexNo;

    @NotNull
    @Basic(optional = false)
    @Column(name = "m_item")
    private int item;
    
    @NotNull
    @Basic(optional = false)
    @Column(name = "colour_code")
    private String colourCode;
  
    @NotNull
    @Basic(optional = false)
    @Column(name = "time")
    private String time;
    
    public MAppointmentItem() {
    }

    public int getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(int indexNo) {
        this.indexNo = indexNo;
    }

    public int getItem() {
        return item;
    }

    public void setItem(int item) {
        this.item = item;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getColourCode() {
        return colourCode;
    }

    public void setColourCode(String colourCode) {
        this.colourCode = colourCode;
    }
    
    
    

}
