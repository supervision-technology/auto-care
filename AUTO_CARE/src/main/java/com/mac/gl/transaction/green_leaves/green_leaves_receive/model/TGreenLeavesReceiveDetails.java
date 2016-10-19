package com.mac.gl.transaction.green_leaves.green_leaves_receive.model;

import com.mac.gl.transaction.green_leaves.model.MClient;
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
@Entity(name = "com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetails")
@Table(name = "t_green_leaves_receive_details")
public class TGreenLeavesReceiveDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer indexNo;
    private Integer branch;
    private Double normalLeavesQuantity;
    private Double superLeavesQuantity;
    @JoinColumn(name = "green_leaves_receive")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private TGreenLeavesReceive greenLeavesReceive;
    @JoinColumn(name = "client")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private MClient client;

    public TGreenLeavesReceiveDetails() {
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

    public TGreenLeavesReceive getGreenLeavesReceive() {
        return greenLeavesReceive;
    }

    public void setGreenLeavesReceive(TGreenLeavesReceive greenLeavesReceive) {
        this.greenLeavesReceive = greenLeavesReceive;
    }

    public MClient getClient() {
        return client;
    }

    public void setClient(MClient client) {
        this.client = client;
    }

}
