/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.report.report_viewer;

import com.mac.care_point.report.report_viewer.model.Report;
import com.mac.care_point.report.report_viewer.model.ReportGroup;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.print.Doc;
import javax.print.DocFlavor;
import javax.print.PrintException;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperPrintManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class ReportViewerService {

    public static final String REPORT_DIR = "reports";
    public static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("MMM dd yyyy");

    @Autowired
    private DataSource dataSource;

    public List<ReportGroup> getReportList() {
        List<ReportGroup> reportGroups = new ArrayList<>();

        FileFilter reportGroupFilter = (File pathname) -> pathname.isDirectory();
        FileFilter reportFileFilter = (File pathname) -> pathname.getName().endsWith(".jrxml");

        File reportDir = new File(REPORT_DIR);
        System.out.println(reportDir.getAbsoluteFile().getPath());

        File[] reportGroupDirs = reportDir.listFiles(reportGroupFilter);
        File[] reportFiles;

        if (reportGroupDirs != null) {
            for (File reportGroupDir : reportGroupDirs) {
                reportFiles = reportGroupDir.listFiles(reportFileFilter);

                ReportGroup reportGroup;
                if (reportFiles != null && reportFiles.length > 0) {
                    reportGroup = new ReportGroup();
                    reportGroup.setGroupName(reportGroupDir.getName());

                    List<Report> reports = new ArrayList<>();
                    for (File reportFile : reportFiles) {
                        Report report = new Report();
                        report.setReportName(reportFile.getName());
                        report.setFileName(reportFile.getAbsolutePath());

                        reports.add(report);
                    }
                    Collections.sort(reports);
                    reportGroup.setReports(reports);

                    reportGroups.add(reportGroup);
                }
            }
        }

        Collections.sort(reportGroups);
        return reportGroups;
    }

    public List<String> getReportParameters(Report report) throws JRException {
        List<String> reportParameters = new ArrayList<>();

        String reportFile = report.getFileName();
        String compiledFilePath = reportFile.replace(".jrxml", ".jasper");
        File compiledFile = new File(compiledFilePath);

        if (!compiledFile.exists()) {//compile report
            compileReport(reportFile, compiledFilePath);
        }

        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(compiledFile);
        JRParameter[] jrParameters = jasperReport.getParameters();

        for (JRParameter jrParameter : jrParameters) {
            if (!jrParameter.isSystemDefined()) {
                reportParameters.add(jrParameter.getName());
            }
        }

        return reportParameters;
    }

    public void writePdfReport(HttpServletResponse response, HashMap<String, String> map, Integer branch) throws JRException, IOException, SQLException, ParseException {
        String action = (String) map.get("action");

        String reportFile = new String(Base64.getDecoder().decode(action));

        String compiledFilePath = reportFile.replace(".jrxml", ".jasper");
        File compiledFile = new File(compiledFilePath);

        if (!compiledFile.exists()) {//compile report
            compileReport(reportFile, compiledFilePath);
        }

        Map<String, Object> params = new HashMap<>();

        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(compiledFile);
        JRParameter[] jRParameters = jasperReport.getParameters();
        for (JRParameter jRParameter : jRParameters) {
            if (!jRParameter.isSystemDefined()) {
                String name = jRParameter.getName();
                Class type = jRParameter.getValueClass();

                String value = map.get(name);
                if (value != null) {
                    System.out.println(type);
                    System.out.println(value);
                    System.out.println(getTypedValue(value, type));
                    System.out.println("-----------------");
                    params.put(name, getTypedValue(value, type));
                }
            }
        }
        params.put("CURRENT_BRANCH", 1);
//        params.put("INVOICE_NO", 1);

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, getConnection());

        String reportName = jasperReport.getName();

        response.setContentType("application/pdf");
        response.setHeader("Content-disposition", "attachment; filename=" + reportName + ".pdf");

        final OutputStream outStream = response.getOutputStream();
        JasperExportManager.exportReportToPdfStream(jasperPrint, outStream);
    }

    private Object getTypedValue(String value, Class type) throws ParseException {
        if (type.equals(Integer.class)) {
            if (!value.isEmpty()) {
                return Integer.parseInt(value);
            } else {
                return null;
            }
        } else if (type.equals(Date.class)) {
            if (value.length() > 15) {
                return DATE_FORMAT.parse(value.substring(4, 15));
            } else {
                return null;
            }
        } else {
            return value;
        }
    }

    private void compileReport(String reportFile, String compiledFile) throws JRException {
        JasperCompileManager.compileReportToFile(reportFile, compiledFile);
    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    public void printReport(HttpServletResponse response, HashMap<String, String> map, Integer branch) throws JRException, IOException, SQLException, ParseException, PrintException {
        String action = (String) map.get("action");

        String reportFile = new String(Base64.getDecoder().decode(action));

        String compiledFilePath = reportFile.replace(".jrxml", ".jasper");
        File compiledFile = new File(compiledFilePath);

        if (!compiledFile.exists()) {
            compileReport(reportFile, compiledFilePath);
        }

        Map<String, Object> params = new HashMap<>();

        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(compiledFile);
        JRParameter[] jRParameters = jasperReport.getParameters();
        for (JRParameter jRParameter : jRParameters) {
            if (!jRParameter.isSystemDefined()) {
                String name = jRParameter.getName();
                Class type = jRParameter.getValueClass();

                String value = map.get(name);
                if (value != null) {
                    params.put(name, getTypedValue(value, type));
                }
            }
        }

        params.put("CURRENT_BRANCH", 1);

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, getConnection());

        String path = System.getProperty("user.dir");
        JasperExportManager.exportReportToPdfFile(jasperPrint, path + "/reports/Report.pdf");
        
        
          FileInputStream in = new FileInputStream(path + "/reports/Report.pdf");
            Doc doc = new SimpleDoc(in, DocFlavor.INPUT_STREAM.AUTOSENSE, null);
        PrintService service = PrintServiceLookup.lookupDefaultPrintService();

        service.createPrintJob().print(doc, null);
        
//        System.out.println(compiledFilePath);
//          String printFileName = JasperFillManager.fillReportToFile(compiledFilePath, params, getConnection());
//         if(printFileName != null){
//            JasperPrintManager.printReport( printFileName, true);
//         }else{
//             System.out.println("print file not found");
//         }
         
         
        JasperPrintManager.printReport(jasperPrint, true);
    }

}
