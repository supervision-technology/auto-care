/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.daily_check_list;

import com.mac.care_point.service.daily_check_list.model.TDailyCheckList;
import com.mac.care_point.service.daily_check_list.model.TSubItemCheckResult;
import com.mac.care_point.system.exception.EntityNotFoundException;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class DailyCheckListService {

    @Autowired
    private DailyCheckListRepository checkListRepository;
    @Autowired
    private SubItemCheckResultRepository subItemCheckResultRepository;

    @Transactional
    public TDailyCheckList saveCheckList(TDailyCheckList dailyCheckList) {

        if (dailyCheckList.getIndexNo() == null) {
            Integer maxNumber = checkListRepository.getMaximumNumberByBranch(1);
            if (maxNumber == null) {
                maxNumber = 0;
            }
            dailyCheckList.setTransaction(maxNumber + 1);
            dailyCheckList.setComplete(true);
        }
        return checkListRepository.save(dailyCheckList);
    }

    @Transactional
    public TSubItemCheckResult saveSubItemCheckResult(Integer indexNo, TSubItemCheckResult subItemCheckResult) {
        TDailyCheckList dailyCheckList = checkListRepository.getOne(indexNo);
        if (dailyCheckList == null) {
            throw new EntityNotFoundException("check list not found" + indexNo);
        }
        subItemCheckResult.setDailyCheckList(dailyCheckList.getIndexNo());

        TSubItemCheckResult subItemCheckResult1 = subItemCheckResultRepository.save(subItemCheckResult);
        checkListRepository.save(dailyCheckList);
        return subItemCheckResult1;
    }

    List<TDailyCheckList> findAllCheck() {
        return checkListRepository.findAll();
    }

    List<TSubItemCheckResult> findAllCheckResults() {
        return subItemCheckResultRepository.findAll();
    }

//    List<TSubItemCheckResult> findAllCheckResultsByDate(Date date) {
//        return subItemCheckResultRepository.findAllCheckResultsByDate(date);
//    }

}
