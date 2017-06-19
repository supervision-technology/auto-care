/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.report.report_viewer.model;

import java.io.Serializable;
import java.util.List;

/**
 *
 * @author Kavish Manjitha
 */
public class ReportGroup implements Serializable, Comparable<ReportGroup> {

    private String groupName;
    private List<Report> reports;

    public ReportGroup() {
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public List<Report> getReports() {
        return reports;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

    @Override
    public int compareTo(ReportGroup o) {
        return this.groupName.compareTo(o.groupName);
    }
}
