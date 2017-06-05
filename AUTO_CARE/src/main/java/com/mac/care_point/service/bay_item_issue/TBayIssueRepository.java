/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.bay_item_issue;

import com.mac.care_point.service.bay_item_issue.model.TBayIssue;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kavish manjitha
 */
public interface TBayIssueRepository extends JpaRepository<TBayIssue, Integer> {

    public List<TBayIssue> findByBay(Integer bay);

}
