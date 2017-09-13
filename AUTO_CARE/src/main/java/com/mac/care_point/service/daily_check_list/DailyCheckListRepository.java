/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.daily_check_list;

import com.mac.care_point.service.daily_check_list.model.TDailyCheckList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kalum
 */
public interface DailyCheckListRepository extends JpaRepository<TDailyCheckList, Integer> {

    @Query(value = "SELECT MAX(transaction)FROM t_daily_check_list WHERE branch=:branch", nativeQuery = true)
    public Integer getMaximumNumberByBranch(@Param("branch") Integer branch);

}
