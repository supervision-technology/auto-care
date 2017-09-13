/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.report.estimate_print.repository;

import com.mac.care_point.report.estimate_print.model.MPrintersDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author kavish manjitha
 */
@Repository
public interface MPrintersDetailsRepository extends JpaRepository<MPrintersDetails, Integer> {

    public MPrintersDetails findByBranchIndexNo(Integer branch);

    @Query(value = "select\n"
            + "	m_vehicle.vehicle_no as vehicle_no,\n"
            + "	m_client.resident as client_resident,\n"
            + "	m_client.name as client_name,\n"
            + "	m_client.mobile as client_mobile_no,\n"
            + "	m_branch.name as branch_name,\n"
            + "	sum(t_job_item.value) as total_amount\n"
            + "FROM t_job_item\n"
            + "	LEFT JOIN t_job_card on t_job_card.index_no=t_job_item.job_card\n"
            + "	LEFT JOIN m_vehicle on m_vehicle.index_no=t_job_card.vehicle\n"
            + "	LEFT JOIN m_client on m_client.index_no=t_job_card.`client`\n"
            + "	LEFT JOIN m_branch on m_branch.index_no=t_job_card.branch\n"
            + "WHERE\n"
            + "	t_job_card.index_no= :jobCard", nativeQuery = true)
    public List<Object[]> getJobCardDetails(@Param("jobCard") Integer jobCard);
}
