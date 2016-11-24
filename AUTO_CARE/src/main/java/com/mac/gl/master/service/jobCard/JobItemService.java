/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.jobCard;

import com.mac.gl.master.model.jobCard.JobCard;
import com.mac.gl.master.model.jobCard.TJobItem;
import com.mac.gl.master.repository.jobCard.JobItemRepository;
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
    
    public List<TJobItem> findAll(JobCard jobCard){
        return itemRepository.findByJobCard(jobCard);
    }
}
