/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.payment_voucher;

import com.mac.care_point.service.payment_voucher.model.PaymentVoucherModel;
import com.mac.care_point.service.invoice.invoice.model.TCustomerLedger;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author L T430
 */
public interface PaymentVoucherRepository extends JpaRepository<TCustomerLedger, Integer> {

    @Query(value = "select GROUP_CONCAT(m_vehicle.vehicle_no) as vehicle_nos from m_vehicle where m_vehicle.`client`=:client", nativeQuery = true)
    public String getClientVehicles(@Param("client") Integer client);

    @Query(value = "select if(sum(t_customer_ledger.credit_amount) - sum(t_customer_ledger.debit_amount)='',0.00,sum(t_customer_ledger.credit_amount) - sum(t_customer_ledger.debit_amount)) as balance_payment\n"
            + "from t_customer_ledger \n"
            + "WHERE (t_customer_ledger.`type`='INVOICE' or t_customer_ledger.`type`='PAYMENT') and t_customer_ledger.`client`=:client\n"
            + "group by t_customer_ledger.`client`", nativeQuery = true)
    public Double getClientBalance(@Param("client") Integer client);

    @Query(value = "select if(sum(t_customer_ledger.debit_amount) - sum(t_customer_ledger.credit_amount)='',0.00,sum(t_customer_ledger.debit_amount) - sum(t_customer_ledger.credit_amount)) as over_payment\n"
            + "from t_customer_ledger \n"
            + "WHERE (t_customer_ledger.`type`='ADVANCE' or t_customer_ledger.`type`='OVER_PAYMENT') and t_customer_ledger.`client`=:client\n"
            + "group by t_customer_ledger.`client`", nativeQuery = true)
    public Double getClientOverPayment(@Param("client") Integer client);

    @Query(value = "select t_customer_ledger.invoice as invoice,\n"
            + "		t_invoice.date as invoice_date,\n"
            + "		t_invoice.net_amount as invoice_amount,\n"
            + "		t_invoice.net_amount-if(sum(t_customer_ledger.credit_amount) - sum(t_customer_ledger.debit_amount)='',0.00,sum(t_customer_ledger.credit_amount) - sum(t_customer_ledger.debit_amount)) as pay_amount,\n"
            + "		 if(sum(t_customer_ledger.credit_amount) - sum(t_customer_ledger.debit_amount)='',0.00,sum(t_customer_ledger.credit_amount) - sum(t_customer_ledger.debit_amount)) as balance_payment\n"
            + "from t_customer_ledger \n"
            + "	left JOIN t_invoice on t_invoice.index_no=t_customer_ledger.invoice\n"
            + "WHERE (t_customer_ledger.`type`='INVOICE' or t_customer_ledger.`type`='PAYMENT') and t_customer_ledger.`client`=:client\n"
            + "group by t_customer_ledger.invoice\n"
            + "HAVING balance_payment>0.00", nativeQuery = true)
    public List<Object> getBalanceInvoice(@Param("client") Integer client);

    @Query(value = "select t_customer_ledger.payment as payment_index,\n"
            + "if(sum(t_customer_ledger.debit_amount) - sum(t_customer_ledger.credit_amount)='',0.00,sum(t_customer_ledger.debit_amount) - sum(t_customer_ledger.credit_amount)) as over_payment,"
            + "t_customer_ledger.`type`\n"
            + "from t_customer_ledger \n"
            + "WHERE (t_customer_ledger.`type`='ADVANCE' or t_customer_ledger.`type`='OVER_PAYMENT') and t_customer_ledger.`client`=:client\n"
            + "group by t_customer_ledger.payment \n"
            + "HAVING over_payment>0.00", nativeQuery = true)
    public List<Object[]> getFIFOList(@Param("client") Integer client);

}
