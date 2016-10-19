package com.mac.gl.transaction.green_leaves.model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Don
 */
@Entity(name = "com.mac.gl.transaction.green_leaves.model.MRoute")
@Table(name = "m_route")
public class MRoute implements Serializable {

    @Id
    private Integer indexNo;
    private Integer branch;
    private String name;
    private Integer routeOfficer;
    private Integer routeHelper;

    public MRoute() {
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

    public Integer getRouteOfficer() {
        return routeOfficer;
    }

    public void setRouteOfficer(Integer routeOfficer) {
        this.routeOfficer = routeOfficer;
    }

    public Integer getRouteHelper() {
        return routeHelper;
    }

    public void setRouteHelper(Integer routeHelper) {
        this.routeHelper = routeHelper;
    }

}
