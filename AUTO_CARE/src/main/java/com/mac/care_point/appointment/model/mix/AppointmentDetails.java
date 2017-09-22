/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment.model.mix;

import com.mac.care_point.appointment.model.TBayDetails;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 *
 * @author my
 */
public class AppointmentDetails implements Serializable{
    
    private Integer indexNo;
    private Integer item;
    private Integer priceCategory;
    private Integer vehicle;
    private int branch;
    private Date receivedDate;
    private Date appointmentDate;
    private String inTime;
    private String clientName;
    private String contactNo;
    private String vehicleNo;
    private String vehicleModel;
    private int status;
    private Boolean priceFree;
    private List<TBayDetails> bayDetails;

    public AppointmentDetails() {
    }

    public AppointmentDetails(Integer indexNo, Integer item, Integer priceCategory, Integer vehicle, int branch, Date receivedDate, Date appointmentDate, String inTime, String clientName, String contactNo, String vehicleNo, String vehicleModel, int status, Boolean priceFree, List<TBayDetails> bayDetails) {
        this.indexNo = indexNo;
        this.item = item;
        this.priceCategory = priceCategory;
        this.vehicle = vehicle;
        this.branch = branch;
        this.receivedDate = receivedDate;
        this.appointmentDate = appointmentDate;
        this.inTime = inTime;
        this.clientName = clientName;
        this.contactNo = contactNo;
        this.vehicleNo = vehicleNo;
        this.vehicleModel = vehicleModel;
        this.status = status;
        this.priceFree = priceFree;
        this.bayDetails = bayDetails;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getItem() {
        return item;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public Integer getPriceCategory() {
        return priceCategory;
    }

    public void setPriceCategory(Integer priceCategory) {
        this.priceCategory = priceCategory;
    }

    public Integer getVehicle() {
        return vehicle;
    }

    public void setVehicle(Integer vehicle) {
        this.vehicle = vehicle;
    }

    public int getBranch() {
        return branch;
    }

    public void setBranch(int branch) {
        this.branch = branch;
    }

    public Date getReceivedDate() {
        return receivedDate;
    }

    public void setReceivedDate(Date receivedDate) {
        this.receivedDate = receivedDate;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getInTime() {
        return inTime;
    }

    public void setInTime(String inTime) {
        this.inTime = inTime;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Boolean getPriceFree() {
        return priceFree;
    }

    public void setPriceFree(Boolean priceFree) {
        this.priceFree = priceFree;
    }

    public List<TBayDetails> getBayDetails() {
        return bayDetails;
    }

    public void setBayDetails(List<TBayDetails> bayDetails) {
        this.bayDetails = bayDetails;
    }

    @Override
    public String toString() {
        return "AppointmentDetails{" + "indexNo=" + indexNo + ", item=" + item + ", priceCategory=" + priceCategory + ", vehicle=" + vehicle + ", branch=" + branch + ", receivedDate=" + receivedDate + ", appointmentDate=" + appointmentDate + ", inTime=" + inTime + ", clientName=" + clientName + ", contactNo=" + contactNo + ", vehicleNo=" + vehicleNo + ", vehicleModel=" + vehicleModel + ", status=" + status + ", priceFree=" + priceFree + ", bayDetails=" + bayDetails + '}';
    }
    
    
    
    

    
}
