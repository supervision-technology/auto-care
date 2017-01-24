/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.jobCard;

import com.mac.care_point.service.jobCard.model.JobCard;
import com.mac.care_point.service.jobCard.model.TJobItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface JobItemRepository extends JpaRepository<TJobItem, Integer> {

    public List<TJobItem> findByJobCard(JobCard jobCard);
}
