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

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<TInvoice> findByJobCard(Integer jobCard) {
        return invoiceRepository.findByJobCard(jobCard);
    }
}
