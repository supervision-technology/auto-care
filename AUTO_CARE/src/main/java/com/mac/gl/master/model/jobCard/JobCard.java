/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.model.jobCard;

import com.mac.gl.master.model.client.Client;
import com.mac.gl.master.model.vehicle.Vehicle;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Supervision
 */
@Entity
@Table(name = "t_job_card")
@XmlRootElement
public class JobCard implements Serializable {

    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "index_no")
    private Integer indexNo;
    
    @Column(name = "number")
    private Integer number;
    
    @Column(name = "branch")
    private Integer branch;
   
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    
    @Column(name = "transaction")
    private Integer transaction;
    
    @Column(name = "price_category")
    private Integer priceCategory;
    
    @Column(name = "in_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date inTime;
    
    @Column(name = "out_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date outTime;
    
    @Column(name = "in_mileage")
    private Integer inMileage;
    
    @Column(name = "next_mileage")
    private Integer nextMileage;
    
    @Size(max = 25)
    @Column(name = "status")
    private String status;
    
    @JoinColumn(name = "client", referencedColumnName = "index_no")
    @ManyToOne(fetch = FetchType.EAGER)
    private Client client;
    
    @JoinColumn(name = "vehicle", referencedColumnName = "index_no")
    @ManyToOne(fetch = FetchType.EAGER)
    private Vehicle vehicle;

    public JobCard() {
    }

    public JobCard(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getTransaction() {
        return transaction;
    }

    public void setTransaction(Integer transaction) {
        this.transaction = transaction;
    }

    public Integer getPriceCategory() {
        return priceCategory;
    }

    public void setPriceCategory(Integer priceCategory) {
        this.priceCategory = priceCategory;
    }

    public Date getInTime() {
        return inTime;
    }

    public void setInTime(Date inTime) {
        this.inTime = inTime;
    }

    public Date getOutTime() {
        return outTime;
    }

    public void setOutTime(Date outTime) {
        this.outTime = outTime;
    }

    public Integer getInMileage() {
        return inMileage;
    }

    public void setInMileage(Integer inMileage) {
        this.inMileage = inMileage;
    }

    public Integer getNextMileage() {
        return nextMileage;
    }

    public void setNextMileage(Integer nextMileage) {
        this.nextMileage = nextMileage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
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
        if (!(object instanceof JobCard)) {
            return false;
        }
        JobCard other = (JobCard) object;
        if ((this.indexNo == null && other.indexNo != null) || (this.indexNo != null && !this.indexNo.equals(other.indexNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mac.gl.master.model.jobCard.JobCard[ indexNo=" + indexNo + " ]";
    }

    
}
