/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.item_sale.model;

import com.mac.care_point.service.invoice.invoice.model.TCustomerLedger;
import com.mac.care_point.service.invoice.invoice.model.TInvoice;
import com.mac.care_point.service.invoice.invoice.model.TPayment;
import com.mac.care_point.service.invoice.invoice.model.TPaymentInformation;
import com.mac.care_point.service.job_item.model.TJobItem;
import com.mac.care_point.service.payment_voucher.model.InvoiceCustomModel;
import java.util.List;

/**
 *
 * @author my
 */
public class ItemSaleModel {

    private List<TJobItem> jobItem;
    private TCustomerLedger customerLedger;
    private TPayment payment;
    private List<TPaymentInformation> paymentInformationList;
    private TInvoice invoice;

    public ItemSaleModel() {
    }

    public ItemSaleModel(List<TJobItem> jobItem, TCustomerLedger customerLedger, TPayment payment, List<TPaymentInformation> paymentInformationList, TInvoice invoice) {
        this.jobItem = jobItem;
        this.customerLedger = customerLedger;
        this.payment = payment;
        this.paymentInformationList = paymentInformationList;
        this.invoice = invoice;
    }

    public List<TJobItem> getJobItem() {
        return jobItem;
    }

    public void setJobItem(List<TJobItem> jobItem) {
        this.jobItem = jobItem;
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

    public TInvoice getInvoice() {
        return invoice;
    }

    public void setInvoice(TInvoice invoice) {
        this.invoice = invoice;
    }

    @Override
    public String toString() {
        return "ItemSaleModel{" + "jobItem=" + jobItem + ", customerLedger=" + customerLedger + ", payment=" + payment + ", paymentInformationList=" + paymentInformationList + ", invoice=" + invoice + '}';
    }

   
}
