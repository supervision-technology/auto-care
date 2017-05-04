/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.daily_check_list;

import com.mac.care_point.service.daily_check_list.model.TDailyCheckList;
import com.mac.care_point.service.daily_check_list.model.TSubItemCheckResult;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kalum
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/care-point/transaction/daily-check-list")
public class DailyCheckListController {

    @Autowired
    private DailyCheckListService checkListService;

    @RequestMapping(method = RequestMethod.GET)
    public List<TDailyCheckList> findAllCheck() {
        return checkListService.findAllCheck();
    }

    @RequestMapping(value = "/result", method = RequestMethod.GET)
    public List<TSubItemCheckResult> findAllCheckResults() {
        return checkListService.findAllCheckResults();
    }
//    @RequestMapping(value = "/loadByDate/{date}", method = RequestMethod.GET)
//    public List<TSubItemCheckResult> findAllCheckResultsByDate(@PathVariable Date date) {
//        return checkListService.findAllCheckResultsByDate(date);
//    }

    @RequestMapping(value = "/save-check-list", method = RequestMethod.POST)
    public Integer saveCheckList(@RequestBody TDailyCheckList dailyCheckList) {
        dailyCheckList = checkListService.saveCheckList(dailyCheckList);
        return dailyCheckList.getIndexNo();
    }

    @RequestMapping(value = "/save-check-sub-item/{indexNo}", method = RequestMethod.POST)
    public TSubItemCheckResult saveSubItemCheckResult(@PathVariable Integer indexNo, @RequestBody TSubItemCheckResult itemCheckResult) {
        return checkListService.saveSubItemCheckResult(indexNo, itemCheckResult);
    }
}
