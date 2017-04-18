/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.invoice.invoice;

import com.mac.care_point.service.invoice.invoice.model.TInvoice;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kavish Manjitha
 */
public interface InvoiceRepository extends JpaRepository<TInvoice, Integer> {

    public List<TInvoice> findByJobCard(Integer jobCard);

    @Query(value = "SELECT MAX(number)FROM t_invoice WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);
}
