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
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

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
            + "and t_employee_assingment.date=:date\n"
            + "   and t_employee_assingment.out_time is null", nativeQuery = true)
    public Integer getBayAssignEmployeeCount(@Param("branch") Integer branch, @Param("bay") Integer bay,@Param("date")String date);

    @Query(value = "SELECT\n"
            + "*\n"
            + "from \n"
            + "	t_employee_assingment a\n"
            + "WHERE a.bay=:bay and a.date=:date and a.`status`='PENDING'", nativeQuery = true)
    public List<TEmployeeAssingment> findByBayAssignEmployee(@Param("bay") Integer bay, @Param("date") String date);

    @Query(value = "SELECT t_employee_assingment.*\n"
            + "From t_employee_assingment \n"
            + "left JOIN m_bay on m_bay.index_no=t_employee_assingment.bay\n"
            + "WHERE  t_employee_assingment.date=:date and t_employee_assingment.`status`='PENDING' and m_bay.branch=:branch "
            + "and t_employee_assingment.`is_out`=0", nativeQuery = true)
    public List<TEmployeeAssingment> findAssignEmployees(@Param("branch") Integer branch, @Param("date") String date);

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

    @Modifying
    @Transactional
    @Query(value = "UPDATE t_employee_assingment\n"
            + "left JOIN m_bay on m_bay.index_no=t_employee_assingment.bay\n"
            + "SET t_employee_assingment.out_time=:time \n"
            + "	, t_employee_assingment.`status`='FINISHED' \n"
            + "	, t_employee_assingment.bay=:bay\n"
            + "	, t_employee_assingment.is_out=1\n"
            + "where  \n"
            + "	m_bay.branch=:branch\n"
            + "	and t_employee_assingment.`status`='PENDING'\n"
            + "	and t_employee_assingment.is_out=0", nativeQuery = true)
    public Integer resetEmployees(@Param("branch") Integer branch, @Param("time") String time, @Param("bay") Integer bay);

//    @Query(value = "UPDATE t_employee_assingment\n"
//            + "SET t_employee_assingment.out_time=\"2017-09-14 13:30:42\" \n"
//            + "	, t_employee_assingment.`status`='FINISHED' \n"
//            + "	, t_employee_assingment.bay=24\n"
//            + "	, t_employee_assingment.is_out=1\n"
//            + "where  \n"
//            + "	t_employee_assingment.index_no=27", nativeQuery = true)
//    public Integer resetEmployees(@Param("branch") Integer branch, @Param("time") String time, @Param("bay") Integer bay);
    @Query(value = "select m_bay.index_no from m_bay where m_bay.branch="
            + "(select t_finger_print_mashine.branch from t_finger_print_mashine "
            + "where t_finger_print_mashine.finger_print=:fingerPrint limit 1) "
            + "and m_bay.`type`=:type", nativeQuery = true)
    public Integer findBranchWaitingBay(@Param("fingerPrint") Integer fingerPrint, @Param("type") String type);

    public List<TEmployeeAssingment> findByEmployeeAndStatusAndDate(int employee, String PENDING_STATUS, String date);

    @Query(value = "select m_branch.name as branchName \n"
            + "from m_branch\n"
            + "left JOIN m_bay on m_bay.branch=m_branch.index_no\n"
            + "where m_bay.index_no=:bay", nativeQuery = true)
    public String getBranchName(@Param("bay") Integer bay);

    @Query(value = "select t_employee_assingment.*\n"
            + "from t_employee_assingment\n"
            + "left JOIN m_bay on m_bay.index_no=t_employee_assingment.bay\n"
            + "where m_bay.branch=:branch and t_employee_assingment.date=:date", nativeQuery = true)
    public List<TEmployeeAssingment> findByBranchAndDate(@Param("branch") Integer branch,@Param("date") String date);

}
