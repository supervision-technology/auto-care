/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.customer_satisfaction;

import com.mac.care_point.master.client.ClientRepository;
import com.mac.care_point.master.client.model.Client;
import com.mac.care_point.master.sms_message.MSmsDetailsRepository;
import com.mac.care_point.master.sms_message.model.MSmsDetails;
import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.customer_satisfaction.model.CustomerSatisfaction;
import com.mac.care_point.service.zmaster.client.model.MClient;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author L T430
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class CustomerSatisfactionService {

    @Autowired
    public CustomerSatisfactionRepository satisfactionRepository;

    @Autowired
    private MSmsDetailsRepository mSmsDetailsRepository;

    @Autowired
    private ClientRepository clientRepository;

    Integer save(CustomerSatisfaction customerSatisfaction) {
        CustomerSatisfaction saveModel = satisfactionRepository.findOne(customerSatisfaction.getIndexNo());
        saveModel.setRate(customerSatisfaction.getRate());
        saveModel.setRateReason(customerSatisfaction.getRateReason());

//        //send sms client satisfaction
//        if (customerSatisfaction.getRate() == 1 || customerSatisfaction.getRate() == 2) {
//            Client client = clientRepository.getOne(customerSatisfaction.getClient());
//            sendCustomerSatisfactionSms(client.getMobile());
//            System.out.println("+++++++++++++++++++++++");
//            System.out.println("send sms client satisfaction");
//        }

        return satisfactionRepository.save(saveModel).getIndexNo();
    }

    List<CustomerSatisfaction> getFinishedJobCard() {
        return satisfactionRepository.findByDefaultFinalCheckAndInvoiceAndRateAndRateReasonAndStatus(true, true, 0, null, Constant.FINISHE_STATUS);
    }

//    private String sendCustomerSatisfactionSms(String contactNo) {
//        List<MSmsDetails> findByStaticNames = mSmsDetailsRepository.findByStaticName(Constant.CUSTOMER_SATISFACTION_MESSAGE);
//        MSmsDetails mSmsDetails = findByStaticNames.get(0);
//        final String uri = "http://smsserver.svisiontec.com/send_sms.php?api_key=" + mSmsDetails.getApKey() + "&number=" + contactNo + "&message=" + mSmsDetails.getMessage();
//        RestTemplate restTemplate = new RestTemplate();
//        String result = restTemplate.getForObject(uri, String.class);
//        return result;
//    }
}
