package com.mac.gl.transaction.green_leaves.green_leaves_receive.http.request;

import java.sql.Date;

/**
 *
 * @author Don
 */
public class FactoryQuantityRequest {

    private Integer route;
    private Date date;

    public FactoryQuantityRequest() {
    }

    public Integer getRoute() {
        return route;
    }

    public void setRoute(Integer route) {
        this.route = route;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
