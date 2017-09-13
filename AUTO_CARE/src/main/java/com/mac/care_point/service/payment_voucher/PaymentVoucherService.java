/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.payment_voucher;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.invoice.invoice.ClientLegerRepository;
import com.mac.care_point.service.invoice.invoice.PaymentInformationRepostory;
import com.mac.care_point.service.invoice.invoice.PaymentRepository;
import com.mac.care_point.service.invoice.invoice.model.TCustomerLedger;
import com.mac.care_point.service.invoice.invoice.model.TInvoice;
import com.mac.care_point.service.invoice.invoice.model.TPayment;
import com.mac.care_point.service.invoice.invoice.model.TPaymentInformation;
import com.mac.care_point.service.payment_voucher.model.BalancePaymentModel;
import com.mac.care_point.service.payment_voucher.model.InvoiceCustomModel;
import com.mac.care_point.service.payment_voucher.model.PaymentVoucherModel;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author L T430
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class PaymentVoucherService {

    @Autowired
    public PaymentVoucherRepository paymentVoucherRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentInformationRepostory paymentInformationRepostory;

    @Autowired
    private ClientLegerRepository clientLegerRepository;

    public Object getClientVehicles(Integer client) {
        return paymentVoucherRepository.getClientVehicles(client);

    }

    public Double getClientBalance(Integer client) {
        return paymentVoucherRepository.getClientBalance(client);
    }

    public Double getClientOverPayment(Integer client) {
        return paymentVoucherRepository.getClientOverPayment(client);
    }

    public int getBalanceInvoiceCount(Integer client) {
        List<Object> balanceInvoiceCount = paymentVoucherRepository.getBalanceInvoice(client);
        return balanceInvoiceCount.size();
    }

    public List<Object> getBalanceInvoice(Integer client) {
        return paymentVoucherRepository.getBalanceInvoice(client);
    }

    @Transactional
    public Integer savePaymentVoucher(PaymentVoucherModel voucherModel) {

        TPayment savePayment = paymentRepository.save(voucherModel.getPayment());
        for (TPaymentInformation paymentInformation : voucherModel.getPaymentInformationList()) {
            paymentInformation.setFormName(Constant.ADVANCE_FORM);
            paymentInformation.setPayment(savePayment.getIndexNo());
            paymentInformationRepostory.save(paymentInformation);
        }
        voucherModel.getCustomerLedger().setDebitAmount(savePayment.getTotalAmount());
        voucherModel.getCustomerLedger().setInvoice(null);
        voucherModel.getCustomerLedger().setPayment(savePayment.getIndexNo());
        voucherModel.getCustomerLedger().setType(Constant.ADVANCE);
        voucherModel.getCustomerLedger().setFormName(Constant.ADVANCE_FORM);
        voucherModel.getCustomerLedger().setRefNumber(savePayment.getIndexNo());
        TCustomerLedger save = clientLegerRepository.save(voucherModel.getCustomerLedger());
        return save.getIndexNo();
    }

    @Transactional
    public Integer saveBalancePaymentVoucher(BalancePaymentModel balancePaymentModel) {

        balancePaymentModel.getPayment().setOverPaymentAmount(BigDecimal.ZERO);
        TPayment savePayment = paymentRepository.save(balancePaymentModel.getPayment());
        double overPaymentSettlementAmount = 0.00;

        for (TPaymentInformation paymentInformation : balancePaymentModel.getPaymentInformationList()) {
            if ("OVER_PAYMENT_SETTLEMENT".equals(paymentInformation.getType())) {
                overPaymentSettlementAmount = paymentInformation.getAmount().doubleValue();
            }
            if (!"OVER_PAYMENT_SETTLEMENT".equals(paymentInformation.getType())) {
                paymentInformation.setFormName(Constant.PAYMENT_VOUCHER_FORM);
                paymentInformation.setPayment(savePayment.getIndexNo());
                paymentInformationRepostory.save(paymentInformation);
            }

        }
        savePayment.setOverPaymentAmount(new BigDecimal(overPaymentSettlementAmount));
        savePayment = paymentRepository.save(savePayment);

        double payAmountTotal = 0.00;
        for (InvoiceCustomModel invoice : balancePaymentModel.getInvoice()) {
            if (invoice.getPay() != 0.00) {
                payAmountTotal += invoice.getPay();
                //save defallt payment
                TCustomerLedger customerLedger = new TCustomerLedger();
                customerLedger.setClient(balancePaymentModel.getCustomerLedger().getClient());
                customerLedger.setCreditAmount(new BigDecimal(0));
                customerLedger.setDate(balancePaymentModel.getCustomerLedger().getDate());
                customerLedger.setDebitAmount(new BigDecimal(invoice.getPay()));
                customerLedger.setFormName(Constant.PAYMENT_FORM);
                customerLedger.setInvoice(invoice.getInvoice());
                customerLedger.setPayment(savePayment.getIndexNo());
                customerLedger.setRefNumber(savePayment.getIndexNo());
                customerLedger.setType(Constant.PAYMENT);
                clientLegerRepository.save(customerLedger);

            }
        }
//            over payment settlement
        if (overPaymentSettlementAmount > 0.00) {
//                    save over payment
            List<Object[]> fifoList = new ArrayList<>();
            while (overPaymentSettlementAmount > 0.00) {
                fifoList = getFIFOList(balancePaymentModel.getCustomerLedger().getClient());

                for (int i = 0; i < fifoList.size(); i++) {
                    Object[] selectFirst = fifoList.get(i);
                    Integer paymentIndex = Integer.parseInt(selectFirst[0].toString());
                    Double overAmount = Double.parseDouble(selectFirst[1].toString());

                    String type = selectFirst[2].toString();

                    if (overPaymentSettlementAmount > overAmount) {
                        //save over payment settlement

                        TCustomerLedger customerLedger = new TCustomerLedger();
                        customerLedger.setClient(balancePaymentModel.getCustomerLedger().getClient());
                        customerLedger.setCreditAmount(new BigDecimal(overAmount));
                        customerLedger.setDate(balancePaymentModel.getCustomerLedger().getDate());
                        customerLedger.setDebitAmount(new BigDecimal(0));
                        customerLedger.setFormName(Constant.PAYMENT_FORM);
                        customerLedger.setInvoice(null);
                        customerLedger.setPayment(paymentIndex);
                        customerLedger.setRefNumber(savePayment.getIndexNo());
                        customerLedger.setType(type);
                        clientLegerRepository.save(customerLedger);

                        overPaymentSettlementAmount -= overAmount;

//                          
                    } else {
                        //save over payment settlement
                        if (overPaymentSettlementAmount > 0.00) {

                            TCustomerLedger customerLedger = new TCustomerLedger();
                            customerLedger.setClient(balancePaymentModel.getCustomerLedger().getClient());
                            customerLedger.setCreditAmount(new BigDecimal(overPaymentSettlementAmount));
                            customerLedger.setDate(balancePaymentModel.getCustomerLedger().getDate());
                            customerLedger.setDebitAmount(new BigDecimal(0));
                            customerLedger.setFormName(Constant.PAYMENT_FORM);
                            customerLedger.setInvoice(null);
                            customerLedger.setPayment(paymentIndex);
                            customerLedger.setRefNumber(savePayment.getIndexNo());
                            customerLedger.setType(type);
                            clientLegerRepository.save(customerLedger);
                        }
                        overPaymentSettlementAmount = 0.00;
                    }

                }

            }
        }

        double totalPaidAmount = balancePaymentModel.getPayment().getTotalAmount().doubleValue();
        //save over payment
        if (payAmountTotal < totalPaidAmount) {
            double overPaymentAmount = totalPaidAmount - payAmountTotal;
            TCustomerLedger customerLedger = new TCustomerLedger();
            customerLedger.setClient(balancePaymentModel.getCustomerLedger().getClient());
            customerLedger.setCreditAmount(BigDecimal.ZERO);
            customerLedger.setDate(balancePaymentModel.getCustomerLedger().getDate());
            customerLedger.setDebitAmount(new BigDecimal(overPaymentAmount));
            customerLedger.setFormName(Constant.PAYMENT_FORM);
            customerLedger.setInvoice(null);
            customerLedger.setPayment(savePayment.getIndexNo());
            customerLedger.setRefNumber(savePayment.getIndexNo());
            customerLedger.setType(Constant.ADVANCE);
            clientLegerRepository.save(customerLedger);
        }
        return savePayment.getIndexNo();
    }

    private List<Object[]> getFIFOList(int client) {
        return paymentVoucherRepository.getFIFOList(client);
    }
}
