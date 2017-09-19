/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.branch;

import com.mac.care_point.master.branch.model.MBranch;
import com.mac.care_point.zutil.SecurityUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author L T430
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/branch")
public class BranchController {

    @Autowired
    private BranchService branchService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MBranch> findAllBrand() {
        return branchService.findAllBrand();
    }
    @RequestMapping(value = "/current-branch",method = RequestMethod.GET)
    public MBranch getCurrentBranch() {
        Integer branchIndex = SecurityUtil.getCurrentUser().getBranch();
       return branchService.findOne(branchIndex);
    }
}
