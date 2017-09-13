/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.security;

import com.mac.care_point.security.model.MBranch;
import com.mac.care_point.security.model.MUser;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kavish manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class MUserService implements UserDetailsService {

    @Autowired
    private MUserRepository mUserRepository;

    @Autowired
    private MBranchRepository branchRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        List<MUser> users = mUserRepository.findByUsername(username);

        if (users.size() > 1) {
            throw new UsernameNotFoundException("multiple users found for username " + username);
        }

        if (users.isEmpty()) {
            throw new UsernameNotFoundException("user not found for username " + username);
        }

        MUser user = users.get(0);
        
        //authorities
        List<GrantedAuthority> authorities = new ArrayList<>();
        MBranch branch = branchRepository.findOne(user.getBranch());

        //user
        SystemUser securityUser = new SystemUser(
                user.getIndexNo(),
                user.getName(),
                user.getUsername(),
                user.getPassword(),
                user.getBranch(),
                branch.getName(),
                authorities);

        return securityUser;
    }

}
