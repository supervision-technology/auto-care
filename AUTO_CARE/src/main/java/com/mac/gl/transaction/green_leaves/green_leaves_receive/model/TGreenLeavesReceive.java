package com.mac.gl.transaction.green_leaves.green_leaves_receive.model;

import com.mac.gl.transaction.green_leaves.model.MRoute;
import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Don
 */
@Entity(name = "com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceive")
@Table(name = "t_green_leaves_receive")
public class TGreenLeavesReceive {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer indexNo;
    private Integer transaction;
    private Integer number;
    private Date date;
    private Integer branch;
    @JoinColumn(name = "route")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MRoute route;

    public TGreenLeavesReceive() {
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getTransaction() {
        return transaction;
    }

    public void setTransaction(Integer transaction) {
        this.transaction = transaction;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public MRoute getRoute() {
        return route;
    }

    public void setRoute(MRoute route) {
        this.route = route;
    }

    @Override
    public String toString() {
        return "TGreenLeavesReceive{" + "indexNo=" + indexNo + ", transaction=" + transaction + ", number=" + number + '}';
    }

    
}
