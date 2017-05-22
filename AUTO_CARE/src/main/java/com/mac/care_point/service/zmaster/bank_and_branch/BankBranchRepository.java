/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.bank_and_branch;

import com.mac.care_point.service.zmaster.bank_and_branch.model.MBankBranch;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kavish Manjitha
 */
public interface BankBranchRepository extends JpaRepository<MBankBranch, Integer>{

    public List<MBankBranch> findByBank(Integer bank);
    
}
