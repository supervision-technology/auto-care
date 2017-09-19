/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.bay;

import com.mac.care_point.master.bay.model.Bay;
import com.mac.care_point.master.branch.model.MBranch;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Supervision
 */
public interface BayRepository extends JpaRepository<Bay, Integer>{

    public List<Bay> findByName(String name);

    public List<Bay> findByBranchAndBayIsView(Integer branch, Integer view);

    public List<Bay> findByBranchAndEmployeeIsView(Integer branch, Integer view);

    public List<Bay> findByBranchAndType(Integer branch, String employee_waiting_bay);
       
}
