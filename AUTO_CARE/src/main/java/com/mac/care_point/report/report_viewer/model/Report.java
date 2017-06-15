/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.report.report_viewer.model;

import java.io.Serializable;

/**
 *
 * @author Mohan
 */
public class Report implements Serializable, Comparable<Report> {

    private String reportName;
    private String fileName;

    public Report() {
    }

    public String getReportName() {
        return reportName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @Override
    public int compareTo(Report o) {
        return this.reportName.compareTo(o.reportName);
    }
}
