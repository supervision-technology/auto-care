/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.appointment;

import com.mac.care_point.appointment.model.MAppointmentItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author my
 */
public interface AppointmentItemRepository extends JpaRepository<MAppointmentItem, Integer>{
    
}
