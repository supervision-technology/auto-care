/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.report.estimate_print.service;

import com.mac.care_point.report.estimate_print.model.ActivationStatus;
import com.mac.care_point.report.estimate_print.model.MPrintersDetails;
import com.mac.care_point.report.estimate_print.repository.MPrintersDetailsRepository;
import java.io.File;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.HashPrintServiceAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.PrintServiceAttributeSet;
import javax.print.attribute.standard.MediaSizeName;
import javax.print.attribute.standard.PrinterName;
import javax.sql.DataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPrintServiceExporter;
import net.sf.jasperreports.engine.export.JRPrintServiceExporterParameter;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author kavish manjitha
 */
@Service
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class PrintService {

    @Autowired
    private MPrintersDetailsRepository mPrintersDetailsRepository;

    @Autowired
    private DataSource dataSource;

    @Transactional
    public Integer findByBranch(Integer branch, Integer jobCard) {
        MPrintersDetails MPrinterDetails = mPrintersDetailsRepository.findByBranchIndexNo(branch);
        System.out.println("BRANCH : " + branch + " JOB CARD :" + jobCard + "PRINT REQUEST");

        if (MPrinterDetails.getEstimateSms().equals(ActivationStatus.ACTIVE)) {
            sndEstimateSms(jobCard, MPrinterDetails.getBranchContactNo());
        } else {
            System.out.println("THIS BRANCH SMS STATUS INACTIVE");
        }

        if (MPrinterDetails.getPrintStatus().equals(ActivationStatus.ACTIVE)) {
            printEstimate(MPrinterDetails.getPrinters(), jobCard);
        } else {
            System.out.println("THIS BRANCH PRINTER STATUS INACTIVE");
        }
        return 1;
    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    public String printEstimate(String printer, Integer jobCard) {
        try {
            JasperCompileManager.compileReportToFile("./reports/Estimate.jrxml", "./reports/Estimate.jasper");
            JasperReport jasperReport = (JasperReport) JRLoader.loadObject(new File("./reports/Estimate.jasper"));

            Map<String, Object> params = new HashMap<>();
            params.put("JOB_CARD", jobCard);

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, getConnection());

            //export jasper report to pdf
            //String path = System.getProperty("user.dir");
            //JasperExportManager.exportReportToPdfFile(jasperPrint, path + "/reports/kavish.pdf");
            //jasper report print default printer
            //JasperPrintManager.printReport(jasperPrint, false);
            JRExporter exporter = new JRPrintServiceExporter();

            //--- Set print properties
            PrintRequestAttributeSet printRequestAttributeSet = new HashPrintRequestAttributeSet();
            printRequestAttributeSet.add(MediaSizeName.ISO_A4);

            //----------------------------------------------------     
            //printRequestAttributeSet.add(new Destination(new java.net.URI("file:d:/output/report.ps")));
            //----------------------------------------------------     
            PrintServiceAttributeSet printServiceAttributeSet = new HashPrintServiceAttributeSet();
            printServiceAttributeSet.add(new PrinterName(printer, null));

            //--- Set print parameters      
            exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
            exporter.setParameter(JRPrintServiceExporterParameter.PRINT_REQUEST_ATTRIBUTE_SET, printRequestAttributeSet);
            exporter.setParameter(JRPrintServiceExporterParameter.PRINT_SERVICE_ATTRIBUTE_SET, printServiceAttributeSet);
            exporter.setParameter(JRPrintServiceExporterParameter.DISPLAY_PAGE_DIALOG, Boolean.FALSE);
            exporter.setParameter(JRPrintServiceExporterParameter.DISPLAY_PRINT_DIALOG, Boolean.FALSE);

            //--- Print the document
            try {
                exporter.exportReport();
                System.out.println("JOB CARD :" + jobCard + "ESTIMATE PRINT!");
            } catch (JRException e) {
                e.printStackTrace();
            }
        } catch (JRException | SQLException ex) {
            ex.printStackTrace();
        }
        return "ESTIMATE PRINT";
    }

    public String sndEstimateSms(Integer jobCard, String branchContactNo) {
        List<Object[]> jobCardDetails = mPrintersDetailsRepository.getJobCardDetails(jobCard);
        String vehicleNo = jobCardDetails.get(0)[0].toString();
        String clientResident = jobCardDetails.get(0)[1].toString();
        String clientName = jobCardDetails.get(0)[2].toString();
        String clientContactNo = jobCardDetails.get(0)[3].toString();
        String branchName = jobCardDetails.get(0)[4].toString();
        String totalAMount = String.format("%.2f", jobCardDetails.get(0)[5]);
        String message = "";

        if (clientResident == null) {

            message = "Dear " + clientName + "\n"
                    + "Thank you for comming CAREPOINT " + branchName + ". Vehicle No " + vehicleNo + " Estimated amout is Rs." + totalAMount + "\n"
                    + "For any clarification please contact us on " + branchContactNo + "";

        } else {

            message = "Dear " + clientResident + ". " + clientName + "\n"
                    + "Thank you for comming CAREPOINT " + branchName + ". Vehicle No " + vehicleNo + " Estimated amout is Rs." + totalAMount + "\n"
                    + "For any clarification please contact us on " + branchContactNo + "";
        }

        final String uri = "http://smsserver.svisiontec.com/send_sms.php?api_key=6560957308&number=" + clientContactNo + "&message=" + message;
        RestTemplate restTemplate = new RestTemplate();
        String result = "";
        if (clientContactNo == null) {
            System.out.println("JOB CARD :" + jobCard + "CLIENT CONTACT NUMBER NOT FOUND!");
        } else {
            result = restTemplate.getForObject(uri, String.class);
        }
        if ("0".equals(result)) {
            System.out.println("JOB CARD :" + jobCard + "ESTIMATE SMS SEND!");
            return "SENT ESTIMATE SMS";
        } else {
            return "SMS NOTE SENT";
        }
    }
}
