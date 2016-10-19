package com.mac.gl.transaction.green_leaves.model;

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
@Entity(name = "com.mac.gl.transaction.green_leaves.green_leaves_receive.model.MClient")
@Table(name = "m_client")
public class MClient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer indexNo;
    private Integer branch;
    private String name;
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "route")
    private MRoute route;
    

    public MClient() {
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MRoute getRoute() {
        return route;
    }

    public void setRoute(MRoute route) {
        this.route = route;
    }

    

}
