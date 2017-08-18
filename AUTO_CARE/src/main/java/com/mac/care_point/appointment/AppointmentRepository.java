/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment;

import com.mac.care_point.appointment.model.TAppointment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author nidura
 */
public interface AppointmentRepository extends JpaRepository<TAppointment, Integer>{

    public List<TAppointment> findByStatus(int status);

    public List<TAppointment> findByStatusAndBranch(int status, int branch);

    public List<TAppointment> findAllByOrderByInTimeDesc();
    
}
