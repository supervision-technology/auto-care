/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.zutil;

import com.mac.care_point.security.SystemUser;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 *
 * @author Kavish Manjitha
 */
public class SecurityUtil {

    public static SystemUser getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof SystemUser) {
            return (SystemUser) principal;
        } else {
            throw new BadCredentialsException("Authentication failed");
        }
    }

}
