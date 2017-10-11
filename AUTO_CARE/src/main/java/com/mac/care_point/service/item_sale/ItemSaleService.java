/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.item_sale;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.invoice.invoice.ClientLegerRepository;
import com.mac.care_point.service.invoice.invoice.InvoiceRepository;
import com.mac.care_point.service.invoice.invoice.PaymentInformationRepostory;
import com.mac.care_point.service.invoice.invoice.PaymentRepository;
import com.mac.care_point.service.invoice.invoice.model.TCustomerLedger;
import com.mac.care_point.service.invoice.invoice.model.TInvoice;
import com.mac.care_point.service.invoice.invoice.model.TPayment;
import com.mac.care_point.service.invoice.invoice.model.TPaymentInformation;
import com.mac.care_point.service.item_sale.model.ItemSaleModel;
import com.mac.care_point.service.job_card.JobCardRepository;
import com.mac.care_point.service.job_card.model.JobCard;
import com.mac.care_point.service.job_item.JobItemRepository;
import com.mac.care_point.service.job_item.model.TJobItem;
import com.mac.care_point.service.payment_voucher.PaymentVoucherRepository;
import com.mac.care_point.service.payment_voucher.model.InvoiceCustomModel;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author my
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ItemSaleService {

    @Autowired
    private ItemSaleRepository itemSaleRepository;

    @Autowired
    private JobCardRepository jobCardRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private JobItemRepository jobItemRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentInformationRepostory paymentInformationRepostory;

    @Autowired
    public PaymentVoucherRepository paymentVoucherRepository;

    @Autowired
    private ClientLegerRepository clientLegerRepository;

    @Transactional
    public Integer saveItemSale(ItemSaleModel itemSaleModel) {
        //TODO number genaration
        TPayment savePayment = new TPayment();
        JobCard jobCard = new JobCard();
        //save job card
        jobCard.setClient(itemSaleModel.getCustomerLedger().getClient());
        jobCard.setBranch(itemSaleModel.getInvoice().getBranch());
        jobCard.setDate(new Date());
        jobCard.setTransaction(1);
        jobCard.setVehicleImages(Boolean.FALSE);
        jobCard.setServiceChagers(Boolean.FALSE);
        jobCard.setFinalCheck(Boolean.FALSE);
        jobCard.setAttenctions(Boolean.FALSE);
        jobCard.setDefaultFinalCheck(Boolean.FALSE);
        jobCard.setInvoice(Boolean.TRUE);
        JobCard job = jobCardRepository.save(jobCard);

        //save invoice
        if (itemSaleModel.getInvoice().getNetAmount().doubleValue() == 0.00) {
            itemSaleModel.getInvoice().setNetAmount(itemSaleModel.getInvoice().getAmount());
        }
        itemSaleModel.getInvoice().setJobCard(job.getIndexNo());
        itemSaleModel.getInvoice().setDate(new Date());
        itemSaleModel.getInvoice().setNumber(0);
        TInvoice saveInvoice = invoiceRepository.save(itemSaleModel.getInvoice());

        //save customer ledger
        TCustomerLedger customerLedger1 = new TCustomerLedger();
        customerLedger1.setClient(itemSaleModel.getCustomerLedger().getClient());
        customerLedger1.setDebitAmount(BigDecimal.ZERO);
        customerLedger1.setDate(new Date());
        customerLedger1.setCreditAmount(itemSaleModel.getInvoice().getNetAmount());
        customerLedger1.setFormName(Constant.ITEMSALE_FORM);
        customerLedger1.setInvoice(saveInvoice.getIndexNo());
        customerLedger1.setPayment(null);
        customerLedger1.setRefNumber(saveInvoice.getIndexNo());
        customerLedger1.setType("INVOICE");
        clientLegerRepository.save(customerLedger1);

        //save job items
        for (TJobItem jobitem : itemSaleModel.getJobItem()) {
            jobitem.setJobCard(job.getIndexNo());
            jobitem.setIsChange(Boolean.FALSE);
            jobItemRepository.save(jobitem);
        }

        //save payment
        if (itemSaleModel.getPayment().getTotalAmount().doubleValue() > 0.00) {
            savePayment = paymentRepository.save(itemSaleModel.getPayment());

            double overPaymentSettlementAmount = 0.00;

            for (TPaymentInformation paymentInformation : itemSaleModel.getPaymentInformationList()) {
                if ("OVER_PAYMENT_SETTLEMENT".equals(paymentInformation.getType())) {
                    overPaymentSettlementAmount = paymentInformation.getAmount().doubleValue();
                }
                if (!"OVER_PAYMENT_SETTLEMENT".equals(paymentInformation.getType())) {
                    paymentInformation.setFormName(Constant.ITEMSALE_FORM);
                    paymentInformation.setPayment(savePayment.getIndexNo());
                    paymentInformationRepostory.save(paymentInformation);
                }
            }

            savePayment.setOverPaymentAmount(new BigDecimal(overPaymentSettlementAmount));
            savePayment = paymentRepository.save(savePayment);

            //over payment settlement
            if (overPaymentSettlementAmount > 0.00) {
                //save over payment
                List<Object[]> fifoList = new ArrayList<>();
                while (overPaymentSettlementAmount > 0.00) {
                    fifoList = getFIFOList(itemSaleModel.getCustomerLedger().getClient());

                    for (int i = 0; i < fifoList.size(); i++) {
                        Object[] selectFirst = fifoList.get(i);
                        Integer paymentIndex = Integer.parseInt(selectFirst[0].toString());
                        Double overAmount = Double.parseDouble(selectFirst[1].toString());

                        String type = selectFirst[2].toString();

                        if (overPaymentSettlementAmount > overAmount) {
                            //save over payment settlement

                            TCustomerLedger customerLedger = new TCustomerLedger();
                            customerLedger.setClient(itemSaleModel.getCustomerLedger().getClient());
                            customerLedger.setCreditAmount(new BigDecimal(overAmount));
                            customerLedger.setDate(new Date());
                            customerLedger.setDebitAmount(new BigDecimal(0));
                            customerLedger.setFormName(Constant.ITEMSALE_FORM);
                            customerLedger.setInvoice(null);
                            customerLedger.setPayment(paymentIndex);
                            customerLedger.setRefNumber(paymentIndex);
                            customerLedger.setType(type);
                            clientLegerRepository.save(customerLedger);

                            overPaymentSettlementAmount -= overAmount;

//                          
                        } else {
                            //save over payment settlement
                            if (overPaymentSettlementAmount > 0.00) {

                                TCustomerLedger customerLedger = new TCustomerLedger();
                                customerLedger.setClient(itemSaleModel.getCustomerLedger().getClient());
                                customerLedger.setCreditAmount(new BigDecimal(overPaymentSettlementAmount));
                                customerLedger.setDate(new Date());
                                customerLedger.setDebitAmount(new BigDecimal(0));
                                customerLedger.setFormName(Constant.ITEMSALE_FORM);
                                customerLedger.setInvoice(null);
                                customerLedger.setPayment(paymentIndex);
                                customerLedger.setRefNumber(paymentIndex);
                                customerLedger.setType(type);
                                clientLegerRepository.save(customerLedger);
                            }
                            overPaymentSettlementAmount = 0.00;
                        }

                    }
                }
            }
        }

        double totalPaidAmount = itemSaleModel.getPayment().getTotalAmount().doubleValue();
        double payAmountTotal = itemSaleModel.getPayment().getCardAmount().doubleValue() + itemSaleModel.getPayment().getCashAmount().doubleValue() + itemSaleModel.getPayment().getChequeAmount().doubleValue();
        //save over payment
        if (payAmountTotal <= totalPaidAmount && totalPaidAmount > 0.00 && payAmountTotal > 0.00) {
            TCustomerLedger customerLedger = new TCustomerLedger();
            customerLedger.setClient(itemSaleModel.getCustomerLedger().getClient());
            customerLedger.setCreditAmount(BigDecimal.ZERO);
            customerLedger.setDate(new Date());
            customerLedger.setDebitAmount(new BigDecimal(payAmountTotal));
            customerLedger.setFormName(Constant.ITEMSALE_FORM);
            customerLedger.setInvoice(null);
            customerLedger.setPayment(savePayment.getIndexNo());
            customerLedger.setRefNumber(savePayment.getIndexNo());
            customerLedger.setType(Constant.PAYMENT);
            clientLegerRepository.save(customerLedger);
        }
        return savePayment.getIndexNo();
    }

    private List<Object[]> getFIFOList(int client) {
        return paymentVoucherRepository.getFIFOList(client);
    }

}
