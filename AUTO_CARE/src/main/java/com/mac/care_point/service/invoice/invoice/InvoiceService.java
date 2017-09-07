/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice;


import com.mac.care_point.master.vehicleAssignment.VehicleAssignmentRepository;
import com.mac.care_point.master.vehicleAssignment.model.TVehicleAssignment;
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
import com.mac.care_point.service.payment_voucher.PaymentVoucherRepository;
import com.mac.care_point.system.exception.EntityNotFoundException;
import com.mac.care_point.zutil.SecurityUtil;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

    @Autowired
    private VehicleAssignmentRepository vehicleAssignmentRepository;

    @Autowired
    public PaymentVoucherRepository paymentVoucherRepository;

    public List<TInvoice> findByJobCard(Integer jobCard) {
        return invoiceRepository.findByJobCard(jobCard);
    }

    @Transactional
    public TInvoice saveInvoice(InvoicePayment invoicePayment) {
        TInvoice invoice = invoicePayment.getInvoice();
        TPayment payment = invoicePayment.getPayment();
        List<TPaymentInformation> paymentInformationList = invoicePayment.getPaymentInformationsList();

        JobCard jobCard = jobCardRepository.getOne(invoice.getJobCard());
//        if (jobCard.getDefaultFinalCheck()) {
        jobCard.setStatus(Constant.FINISHE_STATUS);
//        }
        jobCard.setInvoice(Boolean.TRUE);
        String outTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        jobCard.setOutTime(outTime);

        invoice.setBranch(SecurityUtil.getCurrentUser().getBranch());
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
        customerLedger.setClient(jobCard.getClient());
        customerLedger.setCreditAmount(invoice.getNetAmount());
        customerLedger.setDate(new Date());
        customerLedger.setDebitAmount(BigDecimal.ZERO);
        customerLedger.setFormName(Constant.INVOICE_FORM);
        customerLedger.setPayment(null);
        customerLedger.setInvoice(tInvoice.getIndexNo());
        customerLedger.setRefNumber(tInvoice.getIndexNo());
        customerLedger.setType(Constant.INVOICE_CREATE);
        clientLegerRepository.save(customerLedger);

        //step 02
        //payment save
        TPayment savePaymentData = new TPayment();
        if (paymentInformationList.size() > 0) {
            savePaymentData = paymentRepository.save(payment);
        }

        //payment informations
        //client cledger save  - payment invoice
        double overPaymentSettlementAmount = 0.00;

        for (TPaymentInformation paymentInformation : paymentInformationList) {
            if ("OVER_PAYMENT_SETTLEMENT".equals(paymentInformation.getType())) {
                overPaymentSettlementAmount = paymentInformation.getAmount().doubleValue();
            }
            if (!"OVER_PAYMENT_SETTLEMENT".equals(paymentInformation.getType())) {
                paymentInformation.setFormName(Constant.INVOICE_FORM);
                paymentInformation.setPayment(savePaymentData.getIndexNo());
                paymentInformationRepostory.save(paymentInformation);
            }
        }

//            default payment save
        if (paymentInformationList.size() > 0) {

            TCustomerLedger customerLedgerSavePayment = new TCustomerLedger();
            customerLedgerSavePayment.setClient(jobCard.getClient());
            customerLedgerSavePayment.setCreditAmount(new BigDecimal(0));
            customerLedgerSavePayment.setDate(tInvoice.getDate());
            double debitAmount = savePaymentData.getTotalAmount().doubleValue();
            if (savePaymentData.getTotalAmount().doubleValue() > tInvoice.getNetAmount().doubleValue()) {
                debitAmount = tInvoice.getNetAmount().doubleValue();
            }
            customerLedgerSavePayment.setDebitAmount(new BigDecimal(debitAmount));
            customerLedgerSavePayment.setFormName(Constant.PAYMENT_FORM);
            customerLedgerSavePayment.setInvoice(tInvoice.getIndexNo());
            customerLedgerSavePayment.setPayment(savePaymentData.getIndexNo());
            customerLedgerSavePayment.setRefNumber(savePaymentData.getIndexNo());
            customerLedgerSavePayment.setType(Constant.PAYMENT);
            clientLegerRepository.save(customerLedgerSavePayment);
        }

        //save  is over payment
        if (paymentInformationList.size() > 0) {

            if (tInvoice.getNetAmount().doubleValue() < savePaymentData.getTotalAmount().doubleValue()) {
                double overPaymentAmount = savePaymentData.getTotalAmount().doubleValue() - tInvoice.getNetAmount().doubleValue();
                TCustomerLedger customerLedgerOverPayment = new TCustomerLedger();
                customerLedgerOverPayment.setClient(jobCard.getClient());
                customerLedgerOverPayment.setCreditAmount(BigDecimal.ZERO);
                customerLedgerOverPayment.setDate(tInvoice.getDate());
                customerLedgerOverPayment.setDebitAmount(new BigDecimal(overPaymentAmount));
                customerLedgerOverPayment.setFormName(Constant.PAYMENT_FORM);
                customerLedgerOverPayment.setInvoice(null);
                customerLedgerOverPayment.setPayment(savePaymentData.getIndexNo());
                customerLedgerOverPayment.setRefNumber(savePaymentData.getIndexNo());
                customerLedgerOverPayment.setType(Constant.ADVANCE);
                clientLegerRepository.save(customerLedgerOverPayment);
            }
        }
        //fifo save
        if (overPaymentSettlementAmount > 0.00) {
//                    save over payment
            List<Object[]> fifoList = new ArrayList<>();

            while (overPaymentSettlementAmount > 0.00) {
                fifoList = getFIFOList(jobCard.getClient());
                for (int i = 0; i < fifoList.size(); i++) {
                    Object[] selectFirst = fifoList.get(i);
                    Integer paymentIndex = Integer.parseInt(selectFirst[0].toString());
                    Double overAmount = Double.parseDouble(selectFirst[1].toString());

                    String type = selectFirst[2].toString();

                    if (overPaymentSettlementAmount > overAmount) {
                        //save over payment settlement

                        TCustomerLedger customerLedgerNew = new TCustomerLedger();
                        customerLedgerNew.setClient(jobCard.getClient());
                        customerLedgerNew.setCreditAmount(new BigDecimal(overAmount));
                        customerLedgerNew.setDate(tInvoice.getDate());
                        customerLedgerNew.setDebitAmount(new BigDecimal(0));
                        customerLedgerNew.setFormName(Constant.PAYMENT_FORM);
                        customerLedgerNew.setInvoice(null);
                        customerLedgerNew.setPayment(paymentIndex);
                        customerLedgerNew.setRefNumber(savePaymentData.getIndexNo());
                        customerLedgerNew.setType(type);
                        clientLegerRepository.save(customerLedgerNew);
                        overPaymentSettlementAmount -= overAmount;

//                          
                    } else {
                        //save over payment settlement
                        if (overPaymentSettlementAmount > 0.00) {
                            TCustomerLedger customerLedgerNew2 = new TCustomerLedger();
                            customerLedgerNew2.setClient(jobCard.getClient());
                            customerLedgerNew2.setCreditAmount(new BigDecimal(overPaymentSettlementAmount));
                            customerLedgerNew2.setDate(tInvoice.getDate());
                            customerLedgerNew2.setDebitAmount(new BigDecimal(0));
                            customerLedgerNew2.setFormName(Constant.PAYMENT_FORM);
                            customerLedgerNew2.setInvoice(null);
                            customerLedgerNew2.setPayment(paymentIndex);
                            customerLedgerNew2.setRefNumber(savePaymentData.getIndexNo());
                            customerLedgerNew2.setType(type);
                            clientLegerRepository.save(customerLedgerNew2);
                        }
                        overPaymentSettlementAmount = 0.00;
                    }
                }
            }
        }
        //step 03
        //job card finished status
        jobCardRepository.save(jobCard);

        //vehicle asignment
        if (jobCard.getDefaultFinalCheck()) {

            List<TVehicleAssignment> updatedObjects = vehicleAssignmentRepository.findTop1ByJobCardOrderByInTimeDesc(jobCard.getIndexNo());
            if (!updatedObjects.isEmpty()) {
                TVehicleAssignment updateVehicleAssignment = updatedObjects.get(0);
                if (updateVehicleAssignment.getOutTime() == null) {
                    updateVehicleAssignment.setOutTime(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
                }
                vehicleAssignmentRepository.save(updateVehicleAssignment);
            }
        }
        return tInvoice;
    }

    public BigDecimal addClientOverPayment(Integer client) {
        return clientLegerRepository.addClientOverPayment(client);
    }

    @Transactional
    public InvoicePayment loadInvoiceDetails(Integer invoiceNumber, Integer branch) {

        //get invoice data
        List<TInvoice> getInvoiceList = invoiceRepository.findByNumberAndBranch(invoiceNumber, branch);
        TInvoice tInvoice = getInvoiceList.get(0);

        if (getInvoiceList.isEmpty()) {
            throw new EntityNotFoundException("invoice not found for number " + invoiceNumber);
        } else {

            //client leger data
            List<TCustomerLedger> getClientLegerList = clientLegerRepository.findByInvoiceAndCreditAmountIsNull(tInvoice.getIndexNo());
            TCustomerLedger customerLedger = getClientLegerList.get(0);

            //get payment data
            TPayment tPayment = paymentRepository.findOne(customerLedger.getPayment());

            //payment informetion list
            List<TPaymentInformation> getPaymnetInformationList = paymentInformationRepostory.findByPayment(tPayment.getIndexNo());

            //fill invoicePayment
            InvoicePayment invoicePayment = new InvoicePayment();
            invoicePayment.setInvoice(tInvoice);
            invoicePayment.setPayment(tPayment);
            invoicePayment.setPaymentInformationsList(getPaymnetInformationList);

            return invoicePayment;
        }
    }


    private List<Object[]> getFIFOList(int client) {
        return paymentVoucherRepository.getFIFOList(client);
    }

//    private String sendIvoiceSms(String contactNo) {
//        List<MSmsDetails> findByStaticNames = mSmsDetailsRepository.findByStaticName(Constant.INVOICE_MESSAGE);
//        MSmsDetails mSmsDetails = findByStaticNames.get(0);
//        final String uri = "http://smsserver.svisiontec.com/send_sms.php?api_key=" + mSmsDetails.getApKey() + "&number=" + contactNo + "&message=" + mSmsDetails.getMessage();
//        RestTemplate restTemplate = new RestTemplate();
//        String result = restTemplate.getForObject(uri, String.class);
//        return result;
//    }
}
