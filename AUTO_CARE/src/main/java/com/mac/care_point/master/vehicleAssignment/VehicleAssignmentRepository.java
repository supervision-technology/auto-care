/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.vehicleAssignment;

import com.mac.care_point.master.vehicleAssignment.model.TVehicleAssignment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Supervision
 */
public interface VehicleAssignmentRepository extends JpaRepository<TVehicleAssignment, Integer> {

//    public List<TVehicleAssignment> findByBranchAndJobCardStatusNot(Integer branch, String status);

    public List<TVehicleAssignment> findTop1ByJobCardOrderByInTimeDesc(Integer jobCardIndexNo);

//    public List<TVehicleAssignment> findByJobCardStatusNotIn(String status);
    public List<TVehicleAssignment> findByBranchAndBayAndOutTime(Integer branch, Integer bay, Object object);

//    public List<TVehicleAssignment> findByBranch(Integer branch);
    @Query(value = "select COUNT(t_vehicle_assignment.index_no) as count\n"
            + "from t_vehicle_assignment,t_job_card\n"
            + "where t_job_card.index_no=t_vehicle_assignment.job_card\n"
            + "	and t_vehicle_assignment.branch=:branch \n"
            + "	and t_vehicle_assignment.bay=:bay \n"
            + "	and t_job_card.`status` != :status\n"
            + "	and t_vehicle_assignment.out_time is null", nativeQuery = true)
    public Integer getBayAssignVehicleCount(@Param("branch") Integer branch,@Param("status") String status,@Param("bay") Integer bay);

    public List<TVehicleAssignment> findByJobCard(Integer jobCard);
}
