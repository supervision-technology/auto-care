/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice;

import com.mac.care_point.service.invoice.invoice.model.TCustomerLedger;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kavish Manjitha
 */
public interface ClientLegerRepository extends JpaRepository<TCustomerLedger, Integer> {

    @Query(value = "select\n"
            + " sum(debit_amount) - sum(credit_amount)\n"
            + "from \n"
            + " t_customer_ledger\n"
            + "where \n"
            + " client = :client", nativeQuery = true)
    public BigDecimal addClientOverPayment(@Param("client") Integer client);

    List<TCustomerLedger> findByInvoice(Integer invoice);

    public List<TCustomerLedger> findByInvoiceAndCreditAmountIsNull(Integer indexNo);

}
