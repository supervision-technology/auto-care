package com.mac.gl.transaction.green_leaves.green_leaves_receive.model;

import com.mac.gl.transaction.green_leaves.model.MRoute;
import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Don
 */
@Entity(name = "com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeaveWeigh")
@Table(name = "t_green_leave_weigh")
public class TGreenLeaveWeigh {

    @Id
    private Integer indexNo;
    private Integer branch;
    private Integer number;
    private Date date;
    @JoinColumn(name = "route")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MRoute route;

    public TGreenLeaveWeigh() {
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
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

    public MRoute getRoute() {
        return route;
    }

    public void setRoute(MRoute route) {
        this.route = route;
    }

}
