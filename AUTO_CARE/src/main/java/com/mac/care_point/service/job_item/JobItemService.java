/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.service.job_item.model.TJobItem;
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
public class JobItemService {

    @Autowired
    private JobItemRepository jobItemRepository;

    public TJobItem saveJobItem(TJobItem jobItem) {
        return jobItemRepository.save(jobItem);
    }

    public void deleteJobItem(Integer indexNo) {
        jobItemRepository.delete(indexNo);
    }

    public List<TJobItem> findByJobCardItems(Integer jobCardIndexNo) {
        return jobItemRepository.findByJobCard(jobCardIndexNo);
    }

}
