/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.report.report_viewer;

import static com.mac.care_point.report.report_viewer.ReportViewerService.REPORT_DIR;
import com.mac.care_point.report.report_viewer.model.Report;
import com.mac.care_point.report.report_viewer.model.ReportGroup;
import com.mac.care_point.zutil.SecurityUtil;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import javax.print.PrintException;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kavish Manjitha
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/report/report-viewer")
public class ReportViewerController {

    @Autowired
    private ReportViewerService reportViewerService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<ReportGroup> listReports() {
        return reportViewerService.getReportList();
    }

    @RequestMapping(value = "/report-parameters", method = RequestMethod.POST)
    public List<String> getReportParameters(@RequestBody Report report) throws JRException {
        return reportViewerService.getReportParameters(report);
    }

    @RequestMapping(value = "/report", method = RequestMethod.GET)
    public void viewReport(HttpServletResponse httpServletResponse, @RequestParam HashMap<String, String> map) throws JRException, IOException, SQLException, ParseException {
        reportViewerService.writePdfReport(httpServletResponse, map, SecurityUtil.getCurrentUser().getBranch());
    }

    @RequestMapping(value = "/invoice-report-data/{reportName}", method = RequestMethod.GET)
    public Report viewInvoiceReport(@PathVariable String reportName) {

        File reportDir = new File(REPORT_DIR, "reports" + File.separator + reportName + ".jrxml");
        Report report = new Report();
        report.setFileName(reportDir.getAbsolutePath());
        report.setReportName(reportDir.getName());
        return report;

    }
}