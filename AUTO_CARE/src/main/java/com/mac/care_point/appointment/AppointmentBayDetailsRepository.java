/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment;

import com.mac.care_point.appointment.model.TBayDetails;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author my
 */
public interface AppointmentBayDetailsRepository extends JpaRepository<TBayDetails, Integer>{

    public List<TBayDetails> findByBranchAndDate(int branch, Date date);

    public List<TBayDetails> findAllByAppointment(int indexNo);
}
