/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.sms_message;

import com.mac.care_point.master.sms_message.model.MSmsDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kavish manjitha
 */
public interface MSmsDetailsRepository extends JpaRepository<MSmsDetails, Integer> {

    public List<MSmsDetails> findByStaticName(String name);
}
