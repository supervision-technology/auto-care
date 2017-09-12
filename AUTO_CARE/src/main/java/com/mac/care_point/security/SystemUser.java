/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.security;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

/**
 *
 * @author Kavish Manjitha
 */
public class SystemUser extends User {

    private Integer indexNo;
    private String nickName;
    private Integer branch;
    private String branchName;

    public SystemUser(
            Integer indexNo,
            String nickName,
            String username,
            String password,
            Integer branch,
            String branchName,
            Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);

        this.indexNo = indexNo;
        this.nickName = nickName;
        this.branch = branch;
        this.branchName = branchName;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Integer getBranch() {
        return branch;
    }

    public void setBranch(Integer branch) {
        this.branch = branch;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

}
