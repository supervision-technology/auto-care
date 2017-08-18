/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment;

import com.mac.care_point.appointment.model.MAppointmentItem;
import com.mac.care_point.appointment.model.TAppointment;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author nidura
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentItemRepository appointmentItemRepository;

    public List<TAppointment> findAll() {
        return appointmentRepository.findAllByOrderByInTimeDesc();
    }

    public TAppointment save(TAppointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<TAppointment> pendingAppointment(int status) {
        return appointmentRepository.findByStatus(status);
    }

    public List<TAppointment> pendingAppointmentByBranch(int status, int branch) {
        return appointmentRepository.findByStatusAndBranch(status, branch);
    }

    public List<TAppointment> ApprovedAppointmentByBranch(int status, Integer branch) {
        return appointmentRepository.findByStatusAndBranch(status, branch);
    }

    //appointment item 
    public List<MAppointmentItem> findAllItem() {
        return appointmentItemRepository.findAll();
    }

}
