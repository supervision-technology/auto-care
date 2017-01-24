/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.jobCard;

import com.mac.care_point.service.jobCard.model.JobCard;
import com.mac.care_point.service.jobCard.model.TJobItem;
import com.mac.care_point.service.jobCard.JobCardRepository;
import com.mac.care_point.service.jobCard.JobItemRepository;
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
public class JobItemService {

    @Autowired
    private JobItemRepository itemRepository;

    @Autowired
    private JobCardRepository jobCardRepository;

    public List<TJobItem> findByJobCardIndexNo(Integer jobCard) {
        JobCard card = jobCardRepository.getOne(jobCard);
        return itemRepository.findByJobCard(card);
    }
}
