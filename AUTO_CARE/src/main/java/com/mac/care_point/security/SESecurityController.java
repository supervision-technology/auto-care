/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.security;

import com.mac.care_point.zutil.SecurityUtil;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kavish Manjitha
 */
@CrossOrigin
@RestController
@RequestMapping("/security")
public class SESecurityController {

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public Principal login(Principal principal) {
        return principal;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public Map<String, Object> logout(HttpServletRequest request, HttpServletResponse response) {
        HashMap<String, Object> result = new HashMap<>();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
            result.put("status", "success");
        } else {
            result.put("status", "failed");
        }

        return result;
    }

    @RequestMapping(value = "/user-current-branch", method = RequestMethod.GET)
    public Integer getCurrentBranch() {
        return SecurityUtil.getCurrentUser().getBranch();
    }

}
