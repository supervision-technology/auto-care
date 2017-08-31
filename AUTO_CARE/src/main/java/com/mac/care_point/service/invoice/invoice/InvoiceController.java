/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice;

import com.mac.care_point.service.invoice.invoice.model.InvoicePayment;
import com.mac.care_point.service.invoice.invoice.model.TInvoice;
import com.mac.care_point.zutil.SecurityUtil;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kavish Manjitha
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/jobcard-invoice")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;
    
    @RequestMapping(value = "/get-invoice-details/{invoiceNumber}", method = RequestMethod.GET)
    public InvoicePayment loadInvoiceDetails(@PathVariable Integer invoiceNumber) {
        return invoiceService.loadInvoiceDetails(invoiceNumber, SecurityUtil.getCurrentUser().getBranch());
    }

    @RequestMapping(value = "/find-by-job-card/{jobCard}", method = RequestMethod.GET)
    public List<TInvoice> findByJobCard(@PathVariable Integer jobCard) {
        return invoiceService.findByJobCard(jobCard);
    }

    @RequestMapping(value = "/save-invoice", method = RequestMethod.POST)
    public TInvoice saveInvoice(@RequestBody InvoicePayment invoicePayment) {
        return invoiceService.saveInvoice(invoicePayment);
    }

    @RequestMapping(value = "/client-get-over-payment/{client}", method = RequestMethod.GET)
    public BigDecimal addClientOverPayment(@PathVariable Integer client) {
        return invoiceService.addClientOverPayment(client);
    }
    
}
