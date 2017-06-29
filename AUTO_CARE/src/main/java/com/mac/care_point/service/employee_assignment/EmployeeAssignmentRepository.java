/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_assignment;

import com.mac.care_point.service.employee_assignment.model.TEmployeeAssingment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author L T430
 */
public interface EmployeeAssignmentRepository extends JpaRepository<TEmployeeAssingment, Integer>{

    
}
