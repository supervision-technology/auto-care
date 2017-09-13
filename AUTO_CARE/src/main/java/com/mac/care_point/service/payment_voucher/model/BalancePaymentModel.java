/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.payment_voucher.model;

import com.mac.care_point.service.invoice.invoice.model.TCustomerLedger;
import com.mac.care_point.service.invoice.invoice.model.TInvoice;
import com.mac.care_point.service.invoice.invoice.model.TPayment;
import com.mac.care_point.service.invoice.invoice.model.TPaymentInformation;
import java.util.List;

/**
 *
 * @author L T430
 */
public class BalancePaymentModel {

    private TCustomerLedger customerLedger;
    private TPayment payment;
    private List<TPaymentInformation> paymentInformationList;
    private List<InvoiceCustomModel> invoice;

    public BalancePaymentModel() {
    }

    public BalancePaymentModel(TCustomerLedger customerLedger, TPayment payment, List<TPaymentInformation> paymentInformationList, List<InvoiceCustomModel> invoice) {
        this.customerLedger = customerLedger;
        this.payment = payment;
        this.paymentInformationList = paymentInformationList;
        this.invoice = invoice;
    }

    public TCustomerLedger getCustomerLedger() {
        return customerLedger;
    }

    public void setCustomerLedger(TCustomerLedger customerLedger) {
        this.customerLedger = customerLedger;
    }

    public TPayment getPayment() {
        return payment;
    }

    public void setPayment(TPayment payment) {
        this.payment = payment;
    }

    public List<TPaymentInformation> getPaymentInformationList() {
        return paymentInformationList;
    }

    public void setPaymentInformationList(List<TPaymentInformation> paymentInformationList) {
        this.paymentInformationList = paymentInformationList;
    }

    public List<InvoiceCustomModel> getInvoice() {
        return invoice;
    }

    public void setInvoice(List<InvoiceCustomModel> invoice) {
        this.invoice = invoice;
    }

}
