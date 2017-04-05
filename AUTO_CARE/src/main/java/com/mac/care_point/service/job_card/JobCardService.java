/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card;

import com.mac.care_point.service.job_card.model.JobCard;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class JobCardService {

    final String PENDING_STATUS = "PENDING";
    final String FINISHED_STATUS = "FINISHED";

    @Autowired
    private JobCardRepository jobCardRepository;

    public List<JobCard> getPendingJobCard() {
        return jobCardRepository.findByStatus(PENDING_STATUS);
    }

    public List<JobCard> getClientHistory(Integer indexNo) {
        return jobCardRepository.findJobCardByClient(indexNo);
    }

    public JobCard saveJobCard(JobCard jobCard) {
        if (jobCard.getIndexNo() == null) {
            Integer maxNo = jobCardRepository.getMaximumNumberByBranch(jobCard.getBranch());
            if (maxNo == 0) {
                maxNo = 0;
            }
            jobCard.setNumber(maxNo + 1);
        }
        return jobCardRepository.save(jobCard);
    }

    public JobCard getJobCard(Integer indexNo) {
        return jobCardRepository.findOne(indexNo);
    }

}
