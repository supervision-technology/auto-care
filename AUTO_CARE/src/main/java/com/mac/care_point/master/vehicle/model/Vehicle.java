/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.vehicle.model;

import com.mac.care_point.master.client.model.Client;
import com.mac.care_point.master.priceCategory.model.PriceCategory;

import com.mac.care_point.master.vehicleType.model.VehicleType;
import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Supervision
 */
@Entity(name = "com.mac.care_point.master.vehicle.model.Vehicle")
@Table(name = "m_vehicle")
public class Vehicle implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Size(max = 25)
    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Column(name = "type")
    private String type;

    @Column(name = "year")
    private Integer year;

    @Size(max = 50)
    @Column(name = "engine_no")
    private String engineNo;
    @Size(max = 50)
    @Column(name = "chasis_no")
    private String chasisNo;

    @Column(name = "insurance_expiry_date")
    @Temporal(TemporalType.DATE)
    private Date insuranceExpiryDate;

    @Column(name = "revenue_expiry_date")
    @Temporal(TemporalType.DATE)
    private Date revenueExpiryDate;

    @Basic(optional = false)
    @NotNull
    @Column(name = "last_milage")
    private int lastMilage;

    @Column(name = "next_milage")
    private Integer nextMilage;

    @Size(max = 25)
    @Column(name = "colour")
    private String colour;

    @JoinColumn(name = "client", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Client client;

    @JoinColumn(name = "vehicle_type", referencedColumnName = "index_no")
    @ManyToOne(fetch = FetchType.EAGER)
    private VehicleType vehicleType;

    @JoinColumn(name = "price_category", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private PriceCategory priceCategory;

    public Vehicle() {
    }

    public Vehicle(Integer indexNo, String vehicleNo, String type, Integer year, String engineNo, String chasisNo, Date insuranceExpiryDate, Date revenueExpiryDate, int lastMilage, Integer nextMilage, String colour, Client client, VehicleType vehicleType, PriceCategory priceCategory) {
        this.indexNo = indexNo;
        this.vehicleNo = vehicleNo;
        this.type = type;
        this.year = year;
        this.engineNo = engineNo;
        this.chasisNo = chasisNo;
        this.insuranceExpiryDate = insuranceExpiryDate;
        this.revenueExpiryDate = revenueExpiryDate;
        this.lastMilage = lastMilage;
        this.nextMilage = nextMilage;
        this.colour = colour;
        this.client = client;
        this.vehicleType = vehicleType;
        this.priceCategory = priceCategory;
    }

    public Vehicle(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Vehicle(Integer indexNo, int lastMilage) {
        this.indexNo = indexNo;
        this.lastMilage = lastMilage;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getEngineNo() {
        return engineNo;
    }

    public void setEngineNo(String engineNo) {
        this.engineNo = engineNo;
    }

    public String getChasisNo() {
        return chasisNo;
    }

    public void setChasisNo(String chasisNo) {
        this.chasisNo = chasisNo;
    }

    public Date getInsuranceExpiryDate() {
        return insuranceExpiryDate;
    }

    public void setInsuranceExpiryDate(Date insuranceExpiryDate) {
        this.insuranceExpiryDate = insuranceExpiryDate;
    }

    public Date getRevenueExpiryDate() {
        return revenueExpiryDate;
    }

    public void setRevenueExpiryDate(Date revenueExpiryDate) {
        this.revenueExpiryDate = revenueExpiryDate;
    }

    public int getLastMilage() {
        return lastMilage;
    }

    public void setLastMilage(int lastMilage) {
        this.lastMilage = lastMilage;
    }

    public Integer getNextMilage() {
        return nextMilage;
    }

    public void setNextMilage(Integer nextMilage) {
        this.nextMilage = nextMilage;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public PriceCategory getPriceCategory() {
        return priceCategory;
    }

    public void setPriceCategory(PriceCategory priceCategory) {
        this.priceCategory = priceCategory;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
