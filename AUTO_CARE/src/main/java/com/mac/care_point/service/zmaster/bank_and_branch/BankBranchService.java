/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.bank_and_branch;

import com.mac.care_point.service.zmaster.bank_and_branch.model.MBankBranch;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class BankBranchService {

    @Autowired
    private BankBranchRepository bankBranchRepository;

    public List<MBankBranch> getALlBranckAndBranch() {
        return bankBranchRepository.findAll();
    }

}
