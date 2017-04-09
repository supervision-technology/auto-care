/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn;

import com.mac.care_point.service.grn.model.TGrn;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author L T430
 */
public interface GrnRepository extends JpaRepository<TGrn, Integer> {

    public List<TGrn> findAll();

//    public void getSupplierGrnPaymentHistory(Integer supplier);

//    @Query(value = "select\n"
//            + "	t_grn.number as grn_number,\n"
//            + "	t_grn.date as grn_date,\n"
//            + "	sum(t_supplier_ledger.credit_amount) as net_value,\n"
//            + "	sum(t_supplier_ledger.debit_amount) as pay_value,\n"
//            + "	(sum(t_supplier_ledger.credit_amount)-sum(t_supplier_ledger.debit_amount) ) as balance\n"
//            + "from\n"
//            + "	t_grn,t_supplier_ledger,m_supplier\n"
//            + "where \n"
//            + "	t_grn.index_no=t_supplier_ledger.grn and m_supplier.index_no = t_grn.supplier\n"
//            + "	and t_grn.supplier=:supplier\n"
//            + "	and t_grn.branch=:branch\n"
//            + "GROUP BY t_grn.number", nativeQuery = true)
    @Query(value = "select * from m_supplier where index_no=:supplier", nativeQuery = true)
    public List<Object[]> getSupplierGrnPaymentHistory(@Param("supplier") Integer supplier);

    public TGrn findFirst1ByOrderByIndexNoDesc();

}
