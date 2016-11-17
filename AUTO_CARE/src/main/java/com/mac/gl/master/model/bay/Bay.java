/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.bay;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Supervision
 */
@Entity
@Table(name = "m_bay", catalog = "care_point", schema = "")
@XmlRootElement
public class Bay implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;
    @Size(max = 25)
    @Column(name = "name")
    private String name;
    @Column(name = "max_vehicle")
    private Integer maxVehicle;
    @Column(name = "max_employee")
    private Integer maxEmployee;
    @Column(name = "x")
    private Integer x;
    @Column(name = "y")
    private Integer y;
    @Column(name = "w")
    private Integer w;
    @Column(name = "h")
    private Integer h;
    @Size(max = 25)
    @Column(name = "type")
    private String type;
    @Column(name = "assign_employee")
    private Boolean assignEmployee;
    @Column(name = "assign_vehicle")
    private Boolean assignVehicle;
    @Size(max = 25)
    @Column(name = "color")
    private String color;

    public Bay() {
    }

    public Bay(Integer indexNo) {
        this.indexNo = indexNo;
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

    public Integer getMaxVehicle() {
        return maxVehicle;
    }

    public void setMaxVehicle(Integer maxVehicle) {
        this.maxVehicle = maxVehicle;
    }

    public Integer getMaxEmployee() {
        return maxEmployee;
    }

    public void setMaxEmployee(Integer maxEmployee) {
        this.maxEmployee = maxEmployee;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public Integer getW() {
        return w;
    }

    public void setW(Integer w) {
        this.w = w;
    }

    public Integer getH() {
        return h;
    }

    public void setH(Integer h) {
        this.h = h;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getAssignEmployee() {
        return assignEmployee;
    }

    public void setAssignEmployee(Boolean assignEmployee) {
        this.assignEmployee = assignEmployee;
    }

    public Boolean getAssignVehicle() {
        return assignVehicle;
    }

    public void setAssignVehicle(Boolean assignVehicle) {
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
    public String toString() {
        return "com.mac.gl.master.model.MBay[ indexNo=" + indexNo + " ]";
    }
    
}
