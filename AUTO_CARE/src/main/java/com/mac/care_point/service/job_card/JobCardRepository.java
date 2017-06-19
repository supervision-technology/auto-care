/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card;

import com.mac.care_point.service.job_card.model.JobCard;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kavish Manjitha
 */
public interface JobCardRepository extends JpaRepository<JobCard, Integer> {

    public List<JobCard> findByBay(Integer indexNo);
    
    public List<JobCard> findByStatusOrderByIndexNoDesc(String status);

    @Query(value = "SELECT MAX(number)FROM t_job_card WHERE branch=:branch" , nativeQuery = true)
    public  Integer getMaximumNumberByBranch (@Param("branch")Integer branch);
    
    public List<JobCard> findJobCardByClient(Integer indexNo);

}
