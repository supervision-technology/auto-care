/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.service_selection;

import com.mac.care_point.service.jobCard.JobCardRepository;
import com.mac.care_point.service.jobCard.model.JobCard;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ServiceSelectionService {

    @Autowired
    private JobCardRepository jobCardRepository;

    private final String PENDING_STATUS = "PENDING";
    private final String APPROVE_STATUS = "APPROVE";
    private final String DELETE_STATUS = "DELETED";

    public List<JobCard> getPendingVehicles() {
        return jobCardRepository.findByStatus(PENDING_STATUS);
    }
}
