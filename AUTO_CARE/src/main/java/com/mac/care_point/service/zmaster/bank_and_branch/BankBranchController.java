/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.bank_and_branch;

import com.mac.care_point.service.zmaster.bank_and_branch.model.MBankBranch;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kavish Manjitha
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/care-point/service/zmaster/bankbranch")
public class BankBranchController {

    @Autowired
    public BankBranchService bankBranchService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MBankBranch> getALlBranckAndBranch() {
        return bankBranchService.getALlBranckAndBranch();
    }

}
