/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice.model;

import java.util.List;

/**
 *
 * @author Kavish Manjitha
 */
public class InvoicePayment {

    private TInvoice invoice;
    private TPayment payment;
    private List<TPaymentInformation> paymentInformationsList;

    public InvoicePayment() {
    }

    public InvoicePayment(TInvoice invoice, TPayment payment, List<TPaymentInformation> paymentInformationsList) {
        this.invoice = invoice;
        this.payment = payment;
        this.paymentInformationsList = paymentInformationsList;
    }

    public TInvoice getInvoice() {
        return invoice;
    }

    public void setInvoice(TInvoice invoice) {
        this.invoice = invoice;
    }

    public TPayment getPayment() {
        return payment;
    }

    public void setPayment(TPayment payment) {
        this.payment = payment;
    }

    public List<TPaymentInformation> getPaymentInformationsList() {
        return paymentInformationsList;
    }

    public void setPaymentInformationsList(List<TPaymentInformation> paymentInformationsList) {
        this.paymentInformationsList = paymentInformationsList;
    }

}
