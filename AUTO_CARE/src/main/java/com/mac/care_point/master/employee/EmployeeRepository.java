/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.employee;

import com.mac.care_point.master.employee.model.Employee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kavish manjitha
 */
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    public List<Employee> findByName(String name);

    public List<Employee> findByType(String employeeType);

}
