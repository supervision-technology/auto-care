/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.model.bay;

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
 * @author Supervision
 */
@Entity
@Table(name = "m_bay")
@XmlRootElement
public class Bay implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Column(name = "max_vehicle")
    private int maxVehicle;
    @Basic(optional = false)
    @NotNull
    @Column(name = "max_employee")
    private int maxEmployee;
    @Basic(optional = false)
    @NotNull
    @Column(name = "x")
    private int x;
    @Basic(optional = false)
    @NotNull
    @Column(name = "y")
    private int y;
    @Basic(optional = false)
    @NotNull
    @Column(name = "w")
    private int w;
    @Basic(optional = false)
    @NotNull
    @Column(name = "h")
    private int h;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "type")
    private String type;
    @Basic(optional = false)
    @NotNull
    @Column(name = "assign_employee")
    private boolean assignEmployee;
    @Basic(optional = false)
    @NotNull
    @Column(name = "assign_vehicle")
    private boolean assignVehicle;
    @Size(max = 25)
    @Column(name = "color")
    private String color;

    public Bay() {
    }

    public Bay(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Bay(Integer indexNo, String name, int maxVehicle, int maxEmployee, int x, int y, int w, int h, String type, boolean assignEmployee, boolean assignVehicle) {
        this.indexNo = indexNo;
        this.name = name;
        this.maxVehicle = maxVehicle;
        this.maxEmployee = maxEmployee;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
        this.assignEmployee = assignEmployee;
        this.assignVehicle = assignVehicle;
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

    public int getMaxVehicle() {
        return maxVehicle;
    }

    public void setMaxVehicle(int maxVehicle) {
        this.maxVehicle = maxVehicle;
    }

    public int getMaxEmployee() {
        return maxEmployee;
    }

    public void setMaxEmployee(int maxEmployee) {
        this.maxEmployee = maxEmployee;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getW() {
        return w;
    }

    public void setW(int w) {
        this.w = w;
    }

    public int getH() {
        return h;
    }

    public void setH(int h) {
        this.h = h;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean getAssignEmployee() {
        return assignEmployee;
    }

    public void setAssignEmployee(boolean assignEmployee) {
        this.assignEmployee = assignEmployee;
    }

    public boolean getAssignVehicle() {
        return assignVehicle;
    }

    public void setAssignVehicle(boolean assignVehicle) {
        this.assignVehicle = assignVehicle;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (indexNo != null ? indexNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Bay)) {
            return false;
        }
        Bay other = (Bay) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.gl.master.model.bay.Bay[ indexNo=" + indexNo + " ]";
    }
    
}
