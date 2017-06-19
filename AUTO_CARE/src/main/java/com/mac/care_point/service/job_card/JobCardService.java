/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.job_card.model.JobCard;
import com.mac.care_point.service.job_item.JobItemRepository;
import com.mac.care_point.service.job_item.model.TJobItem;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class JobCardService {

    @Autowired
    private JobCardRepository jobCardRepository;

    @Autowired
    private JobItemRepository jobItemRepository;

    public List<JobCard> getPendingJobCard() {
        return jobCardRepository.findByStatusOrderByIndexNoDesc(Constant.PENDING_STATUS);
    }

    public List<JobCard> getClientHistory(Integer indexNo) {
        return jobCardRepository.findJobCardByClient(indexNo);
    }

    public JobCard saveJobCard(JobCard jobCard) {
        if (jobCard.getIndexNo() == null) {
            Integer maxNo = jobCardRepository.getMaximumNumberByBranch(jobCard.getBranch());
            if (maxNo == null) {
                maxNo = 0;
            }
            jobCard.setNumber(maxNo + 1);
        }
        jobCard.setInTime(new Date());
        jobCard.setDate(new Date());
        return jobCardRepository.save(jobCard);
    }

    public JobCard getJobCard(Integer indexNo) {
        return jobCardRepository.findOne(indexNo);
    }

    @Transactional
    public JobCard setServiceChargers(Integer jobCard, Boolean status) {
        //jobcard set service chargers
        JobCard getJobCardData = jobCardRepository.findOne(jobCard);
        getJobCardData.setServiceChagers(status);

        //job item insert row service chargers
        if (getJobCardData.getServiceChagers()) {

            TJobItem jobItem = new TJobItem();
            jobItem.setJobCard(getJobCardData.getIndexNo());
            jobItem.setItemType(Constant.SERVICE_CHARGERS);
            jobItem.setPrice(new BigDecimal("500.00"));
            jobItem.setQuantity(BigDecimal.ONE);
            jobItem.setValue(new BigDecimal("500.00"));
            jobItem.setJobStatus(Constant.PENDING_STATUS);
            jobItem.setOrderStatus(Constant.PENDING_STATUS);
            jobItemRepository.save(jobItem);
            jobCardRepository.save(getJobCardData);
            
        } else {
            
            //service chargers remove
            List<TJobItem> getItemDataList = jobItemRepository.findByJobCardAndItemType(getJobCardData.getIndexNo(), Constant.SERVICE_CHARGERS);
            for (TJobItem tJobItem : getItemDataList) {
                jobItemRepository.deleteFromIndex(tJobItem.getIndexNo());
            }
        }

        return getJobCardData;
    }
}
