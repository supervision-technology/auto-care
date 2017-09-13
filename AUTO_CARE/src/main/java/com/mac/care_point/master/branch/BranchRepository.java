/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.branch;

import com.mac.care_point.master.branch.model.MBranch;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author L T430
 */
public interface BranchRepository extends JpaRepository<MBranch, Integer>{

    public List<MBranch> findAll();
    
    public MBranch findByType(String type);
    
    
}
