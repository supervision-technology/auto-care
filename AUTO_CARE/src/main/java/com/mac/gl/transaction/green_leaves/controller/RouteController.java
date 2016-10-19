/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.controller;

import com.mac.gl.system.http.HttpRespondBuilder;
import com.mac.gl.system.http.HttpRespondModel;
import com.mac.gl.transaction.green_leaves.model.MRoute;
import com.mac.gl.transaction.green_leaves.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Mohan
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @RequestMapping(method = RequestMethod.GET)
    public HttpRespondModel<MRoute> findByBranch() {
        return HttpRespondBuilder.successRespond(routeService.findByBranch(1));
    }

}
