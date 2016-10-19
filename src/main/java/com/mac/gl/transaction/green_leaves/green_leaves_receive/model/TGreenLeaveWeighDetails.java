package com.mac.gl.transaction.green_leaves.green_leaves_receive.model;

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
@Entity(name = "com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeaveWeighDetails")
@Table(name = "t_green_leave_weigh_detail")
public class TGreenLeaveWeighDetails {

    @Id
    private Integer indexNo;
    private Integer branch;
    private Double normalLeavesQuantity;
    private Double superLeavesQuantity;
    @JoinColumn(name = "green_leave_weigh")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TGreenLeaveWeigh greenLeavesWeigh;

    public TGreenLeaveWeighDetails() {
    }

    public TGreenLeaveWeighDetails(Double normalLeavesQuantity, Double superLeavesQuantity) {
        this.normalLeavesQuantity = normalLeavesQuantity;
        this.superLeavesQuantity = superLeavesQuantity;
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

    public Double getNormalLeavesQuantity() {
        return normalLeavesQuantity;
    }

    public void setNormalLeavesQuantity(Double normalLeavesQuantity) {
        this.normalLeavesQuantity = normalLeavesQuantity;
    }

    public Double getSuperLeavesQuantity() {
        return superLeavesQuantity;
    }

    public void setSuperLeavesQuantity(Double superLeavesQuantity) {
        this.superLeavesQuantity = superLeavesQuantity;
    }

    public TGreenLeaveWeigh getGreenLeavesWeigh() {
        return greenLeavesWeigh;
    }

    public void setGreenLeavesWeigh(TGreenLeaveWeigh greenLeavesWeigh) {
        this.greenLeavesWeigh = greenLeavesWeigh;
    }

}
