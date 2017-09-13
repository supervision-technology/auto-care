/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_attendance;

import com.mac.care_point.service.employee_attendance.model.TEmployeeAttendance;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author L T430
 */
public interface TEmployeeAttendanceRepository extends JpaRepository<TEmployeeAttendance, Integer>{

    public List<TEmployeeAttendance> findByDateAndEmployee(Date date, Integer indexNo);
    
}
