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

    @Autowired
    private AppointmentBayDetailsRepository appointmentBayDetailsRepository;

    @Autowired
    private AppointmentBayRepository appointmentBayRepository;

    public List<TAppointment> findAll() {
        return appointmentRepository.findAllByOrderByInTimeDesc();
    }

    @Transactional
    public TBayDetails save(AppointmentDetails appointmentDetails) {
        TBayDetails details = new TBayDetails();
        List<TBayDetails> bayDetails = appointmentDetails.getBayDetails();
        for (TBayDetails bayDetail : bayDetails) {
            TBayDetails tBayDetails = new TBayDetails();
            tBayDetails.setVehicle(bayDetail.getVehicle());
            tBayDetails.setAppointmentItem(bayDetail.getAppointmentItem());
            tBayDetails.setAppointmentBay(bayDetail.getAppointmentBay());
            tBayDetails.setInTime(bayDetail.getInTime());
            tBayDetails.setBranch(bayDetail.getBranch());
            tBayDetails.setDate(bayDetail.getDate());

            details = appointmentBayDetailsRepository.save(tBayDetails);
        }
        TAppointment tAppointment = new TAppointment();
        tAppointment.setItem(appointmentDetails.getItem());
        tAppointment.setPriceCategory(appointmentDetails.getPriceCategory());
        tAppointment.setBranch(appointmentDetails.getBranch());
        tAppointment.setStatus(0);
        tAppointment.setVehicle(appointmentDetails.getVehicle());
        tAppointment.setVehicleNo(appointmentDetails.getVehicleNo());
        tAppointment.setVehicleModel(appointmentDetails.getVehicleModel());
        tAppointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
        tAppointment.setClientName(appointmentDetails.getClientName());
        tAppointment.setContactNo(appointmentDetails.getContactNo());
        appointmentRepository.save(tAppointment);

        return details;
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

    public List<TBayDetails> bayDetails(int branch, Date date) {
        return appointmentBayDetailsRepository.findByBranchAndDate(branch, date);
    }

    public MAppointmentBay allBay(int index) {
        return appointmentBayRepository.findOne(index);
    }

}
