/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_assignment;

import com.mac.care_point.service.employee_assignment.model.TEmployeeAssingment;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author L T430
 */
public interface EmployeeAssignmentRepository extends JpaRepository<TEmployeeAssingment, Integer> {

    public List<TEmployeeAssingment> findTop1ByEmployeeOrderByInTimeDesc(Integer employee);

    @Query(value = "select COUNT(t_employee_assingment.index_no) as count\n"
            + "from t_employee_assingment,m_bay\n"
            + "   where m_bay.index_no=t_employee_assingment.bay\n"
            + "	and m_bay.branch=:branch\n"
            + "   and t_employee_assingment.bay=:bay\n"
            + "   and t_employee_assingment.out_time is null", nativeQuery = true)
    public Integer getBayAssignEmployeeCount(@Param("branch") Integer branch, @Param("bay") Integer bay);

    @Query(value = "SELECT\n"
            + "*\n"
            + "from \n"
            + "	t_employee_assingment a\n"
            + "WHERE a.bay=:bay and a.date=:date and a.`status`='PENDING'", nativeQuery = true)
    public List<TEmployeeAssingment> findByBayAssignEmployee(@Param("bay") Integer bay, @Param("date") String date);

    @Query(value = "select\n"
            + "	count(t_employee_assingment.index_no)\n"
            + "from\n"
            + "	t_employee_assingment,m_bay\n"
            + "where \n"
            + "	m_bay.index_no=t_employee_assingment.bay\n"
            + "	and t_employee_assingment.bay=:bay \n"
            + "	and t_employee_assingment.`status`=:status \n"
            + "	and t_employee_assingment.date=:date\n"
            + "	and m_bay.branch=:branch", nativeQuery = true)
    public Integer checkEmployeAssign(@Param("bay") Integer bay, @Param("branch") Integer branch, @Param("date") String date, @Param("status") String status);

}
