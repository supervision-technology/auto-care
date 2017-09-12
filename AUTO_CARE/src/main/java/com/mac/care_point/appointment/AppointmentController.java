/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment;

import com.mac.care_point.appointment.model.MAppointmentBay;
import com.mac.care_point.appointment.model.MAppointmentItem;
import com.mac.care_point.appointment.model.TAppointment;
import com.mac.care_point.appointment.model.TBayDetails;
import com.mac.care_point.appointment.model.mix.AppointmentDetails;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author nidura
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/transaction/appointment")
public class AppointmentController {

    private final Integer branch = 1;

    @Autowired
    private AppointmentService appointmentService;

    @RequestMapping(method = RequestMethod.GET)
    public List<TAppointment> findAll() {
        return appointmentService.findAll();
    }

    @RequestMapping(value = "/pending/{status}", method = RequestMethod.GET)
    public List<TAppointment> pendingAppointment(@PathVariable int status) {
        return appointmentService.pendingAppointment(status);
    }

    @RequestMapping(value = "/pending-appointment/{status}", method = RequestMethod.GET)
    public List<TAppointment> pendingAppointmentByBranch(@PathVariable int status) {
        return appointmentService.pendingAppointmentByBranch(status, branch);
    }

    @RequestMapping(value = "/approved-appointment/{status}", method = RequestMethod.GET)
    public List<TAppointment> ApprovedAppointmentByBranch(@PathVariable int status) {
        return appointmentService.ApprovedAppointmentByBranch(status, branch);
    }

//    @RequestMapping(value = "/save", method = RequestMethod.POST)
//    public TAppointment save(@RequestBody TAppointment appointment) {
//        appointment.setBranch(branch);
//        appointment.setStatus(0);
//        System.out.println(appointment.toString());
////        return appointmentService.save(appointment);
//        return null;
//    }
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public TBayDetails save(@RequestBody AppointmentDetails appointmentDetails) {
        System.out.println(appointmentDetails.toString());
        return appointmentService.save(appointmentDetails);
    }

    @RequestMapping(value = "/delete-appointment/{indexNo}", method = RequestMethod.POST)
    public TAppointment deleteAppointment(@PathVariable int indexNo) {
        return appointmentService.deleteAppointment(indexNo);
    }

    // appointment item
    @RequestMapping(value = "/item", method = RequestMethod.GET)
    public List<MAppointmentItem> findAllItem() {
        return appointmentService.findAllItem();
    }

    @RequestMapping(value = "/all-bay/{indexNo}", method = RequestMethod.GET)
    public MAppointmentBay AllBay(@PathVariable int indexNo) {
        return appointmentService.allBay(indexNo);
    }

    @RequestMapping(value = "/bay-details/{branch}/{date}", method = RequestMethod.GET)
    public List<TBayDetails> bayDetails(@PathVariable int branch, @PathVariable Date date) {
        return appointmentService.bayDetails(branch, date);
    }
    
    //price category
     @RequestMapping(value = "/vehicle-price-category/{vehicle}", method = RequestMethod.GET)
    public Integer getPriceCategoryByVehicle(@PathVariable Integer vehicle) {
        return appointmentService.getPriceCategory(vehicle);
    }

}
