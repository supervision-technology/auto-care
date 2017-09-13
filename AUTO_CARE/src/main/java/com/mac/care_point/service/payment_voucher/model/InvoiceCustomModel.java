/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.payment_voucher.model;

import java.util.Date;

/**
 *
 * @author L T430
 */
public class InvoiceCustomModel {

    private int invoice;
    private String vehicle;
    private Date date;
    private double balance;
    private double amount;
    private double paid;
    private double pay;

    public InvoiceCustomModel() {
    }

    public InvoiceCustomModel(int invoice, String vehicle, Date date, double balance, double amount, double paid, double pay) {
        this.invoice = invoice;
        this.vehicle = vehicle;
        this.date = date;
        this.balance = balance;
        this.amount = amount;
        this.paid = paid;
        this.pay = pay;
    }

    public int getInvoice() {
        return invoice;
    }

    public void setInvoice(int invoice) {
        this.invoice = invoice;
    }

    public String getVehicle() {
        return vehicle;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getPaid() {
        return paid;
    }

    public void setPaid(double paid) {
        this.paid = paid;
    }

    public double getPay() {
        return pay;
    }

    public void setPay(double pay) {
        this.pay = pay;
    }

}
