/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.final_check_list;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.final_check_list.model.TJobItemCheck;
import com.mac.care_point.service.job_card.JobCardRepository;
import com.mac.care_point.service.job_card.model.JobCard;
import com.mac.care_point.service.job_item.JobItemRepository;
import com.mac.care_point.service.job_item.model.TJobItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kavish manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class TJobItemCheckService {

    @Autowired
    private TJobItemCheckRepository itemCheckRepository;

    @Autowired
    private JobItemRepository jobItemRepository;

    @Autowired
    private JobCardRepository jobCardRepository;

    public TJobItemCheck saveTJobItemCheck(TJobItemCheck itemCheck) {
        return itemCheckRepository.save(itemCheck);
    }

    public List<TJobItemCheck> findByJobItem(Integer jobItem) {
        return itemCheckRepository.findByJobItem(jobItem);
    }

    @Transactional
    public TJobItemCheck checkedItem(Integer indexNo, String status) {
        TJobItemCheck getSaveItem = itemCheckRepository.getOne(indexNo);
        getSaveItem.setStatus(status);

        List<TJobItemCheck> list = itemCheckRepository.findByJobItem(getSaveItem.getJobItem());
        String mainItemStatus = "COMPLITED";

        for (TJobItemCheck tJobItemCheck : list) {
            if ("NOT_CHECK".equals(tJobItemCheck.getStatus())) {
                mainItemStatus = "PENDING";
            }
        }

        TJobItem getTJobItem = jobItemRepository.getOne(getSaveItem.getJobItem());
        getTJobItem.setJobStatus(mainItemStatus);

        //get job card final check list status update
        JobCard getJobCardData = jobCardRepository.findOne(getTJobItem.getJobCard());

        List<TJobItemCheck> compliteCheckList = itemCheckRepository.findByJobCardAndStatus(getTJobItem.getJobCard(), Constant.NOT_CHECK_STATUS);
        if (compliteCheckList.isEmpty()) {
            getJobCardData.setFinalCheck(Boolean.TRUE);
        } else {
            getJobCardData.setFinalCheck(Boolean.FALSE);
        }
        
        jobCardRepository.save(getJobCardData);

        jobItemRepository.save(getTJobItem);
        return itemCheckRepository.save(getSaveItem);
    }

}
