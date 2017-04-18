/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice;

import com.mac.care_point.service.invoice.invoice.model.TInvoice;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.invoice.invoice.model.InvoicePayment;
import com.mac.care_point.service.invoice.invoice.model.TCustomerLedger;
import com.mac.care_point.service.invoice.invoice.model.TPayment;
import com.mac.care_point.service.invoice.invoice.model.TPaymentInformation;
import com.mac.care_point.service.job_card.JobCardRepository;
import com.mac.care_point.service.job_card.model.JobCard;
import java.util.Date;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ClientLegerRepository clientLegerRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentInformationRepostory paymentInformationRepostory;

    @Autowired
    private JobCardRepository jobCardRepository;

    public List<TInvoice> findByJobCard(Integer jobCard) {
        return invoiceRepository.findByJobCard(jobCard);
    }

    @Transactional
    public TInvoice saveInvoice(InvoicePayment invoicePayment) {
        TInvoice invoice = invoicePayment.getInvoice();
        TPayment payment = invoicePayment.getPayment();
        List<TPaymentInformation> paymentInformationList = invoicePayment.getPaymentInformationsList();

        invoice.setBranch(1);
        //step 01
        //invoice save
        if (invoice.getIndexNo() == null) {
            Integer maxNo = invoiceRepository.getMaximumNumberByBranch(invoice.getBranch());
            if (maxNo == null) {
                maxNo = 0;
            }
            invoice.setNumber(maxNo + 1);
        }

        invoice.setStatus(Constant.INVOICE_FORM);
        TInvoice tInvoice = invoiceRepository.save(invoice);

        //client cledger save  - create invoice
        TCustomerLedger customerLedger = new TCustomerLedger();
        customerLedger.setCreditAmount(invoice.getNetAmount());
        customerLedger.setDate(new Date());
        customerLedger.setInvoice(tInvoice.getIndexNo());
        customerLedger.setType(Constant.INVOICE_CREATE);
        clientLegerRepository.save(customerLedger);

        //step 02
        //payment save
        TPayment savePaymentData = paymentRepository.save(payment);

        //payment informations
        for (TPaymentInformation tPaymentInformation : paymentInformationList) {
            tPaymentInformation.setFormName(Constant.INVOICE_FORM);
            tPaymentInformation.setPayment(savePaymentData.getIndexNo());

            //client cledger save  - payment invoice
            TCustomerLedger customerLedgerPaymnetSave = new TCustomerLedger();
            customerLedgerPaymnetSave.setDebitAmount(tPaymentInformation.getAmount());
            customerLedgerPaymnetSave.setDate(new Date());
            customerLedgerPaymnetSave.setInvoice(tInvoice.getIndexNo());
            customerLedgerPaymnetSave.setType(Constant.INVOICE_PAYMENT);
            customerLedgerPaymnetSave.setPayment(savePaymentData.getIndexNo());
            
            clientLegerRepository.save(customerLedgerPaymnetSave);
            paymentInformationRepostory.save(tPaymentInformation);
        }

        //step 03
        //job card finished status
        JobCard jobCard = jobCardRepository.getOne(invoice.getJobCard());
        jobCard.setStatus(Constant.FINISHE_STATUS);
        jobCardRepository.save(jobCard);

        return tInvoice;
    }
}
