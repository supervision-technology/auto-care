/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.check_list;

import com.mac.care_point.master.check_list.model.TSubItemCheckResult;
import com.mac.care_point.master.item.MItem;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface TSubItemCheckResultRepository extends JpaRepository<TSubItemCheckResult, Integer> {

    public List<TSubItemCheckResult> findBySubItemItemAndDailyCheckListDate(MItem item, Date date);

    public List<TSubItemCheckResult> findBySubItemItemAndChecked(MItem item, Boolean cheked);
}
