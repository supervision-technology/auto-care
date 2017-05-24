/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.bank_and_branch;

import com.mac.care_point.service.zmaster.bank_and_branch.model.MBank;
import com.mac.care_point.service.zmaster.bank_and_branch.model.MBankBranch;
import com.mac.care_point.service.zmaster.bank_and_branch.model.MCardType;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kavish Manjitha
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/care-point/service/zmaster")
public class BankBranchController {

    @Autowired
    public BankBranchService bankBranchService;

    @RequestMapping(value = "/bank", method = RequestMethod.GET)
    public List<MBank> getALlBranck() {
        return bankBranchService.getAllBank();
    }

    @RequestMapping(value = "/branch", method = RequestMethod.GET)
    public List<MBankBranch> getALlBranch() {
        return bankBranchService.getAllBranch();
    }
    
    @RequestMapping(value = "/card_type", method = RequestMethod.GET)
    public List<MCardType> findByCardType() {
        return bankBranchService.findByCardType();
    }
    
    @RequestMapping(value = "/find-by-branch/{bank}", method = RequestMethod.GET)
    public List<MBankBranch> findByBankGetBranchs(@PathVariable Integer bank) {
        return bankBranchService.findByBankGetBranchs(bank);
    }

}
