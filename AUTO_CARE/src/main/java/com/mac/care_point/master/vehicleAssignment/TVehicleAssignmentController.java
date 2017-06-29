/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.vehicleAssignment;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.mac.care_point.master.vehicleAssignment.model.TVehicleAssignment;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/vehicle-assignment")
public class TVehicleAssignmentController {

    Integer branch = 1;

    @Autowired
    private VehicleAssignmentService vehicleAssignmentService;

    @RequestMapping(method = RequestMethod.GET)
    public List<TVehicleAssignment> findAll() {
        return vehicleAssignmentService.findAll();
    }

    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public TVehicleAssignment insertDetail(@RequestBody TVehicleAssignment vehicleAssignment) {
        return vehicleAssignmentService.saveDetail(vehicleAssignment);
    }

    @RequestMapping(value = "/job-finished", method = RequestMethod.POST)
    public TVehicleAssignment jobFinished(@RequestBody TVehicleAssignment vehicleAssignment) {
        return vehicleAssignmentService.jobFinished(vehicleAssignment);
    }

    @RequestMapping(value = "/load_not_finished_vehicle_assignment/{bay}", method = RequestMethod.GET)
    public Integer getBayAssignVehicleCount(@PathVariable Integer bay) {
        return vehicleAssignmentService.getBayAssignVehicleCount(bay, branch);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteDetail(@PathVariable Integer indexNo) {
        vehicleAssignmentService.deleteDetail(indexNo);
        return indexNo;
    }

}
