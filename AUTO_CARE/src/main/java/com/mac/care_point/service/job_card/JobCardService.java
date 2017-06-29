/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card;

import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.final_check_list.MFinalCheckListItemRepostory;
import com.mac.care_point.service.final_check_list.TJobFinalCheckListRepository;
import com.mac.care_point.service.final_check_list.model.MFinalCheckListItem;
import com.mac.care_point.service.final_check_list.model.TJobFinalCheckList;
import com.mac.care_point.service.job_card.model.JobCard;
import com.mac.care_point.service.job_item.JobItemRepository;
import com.mac.care_point.service.job_item.model.TJobItem;
import com.mac.care_point.service.vehicle_attenctions.MVehicleAttenctionRepository;
import com.mac.care_point.service.vehicle_attenctions.TJobVehicleAttenctionsRepository;
import com.mac.care_point.service.vehicle_attenctions.model.MVehicleAttenctions;
import com.mac.care_point.service.vehicle_attenctions.model.TJobVehicleAttenctions;
import com.mac.care_point.system.exception.DuplicateEntityException;
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

    @Autowired
    private MVehicleAttenctionRepository attenctionRepository;

    @Autowired
    private TJobVehicleAttenctionsRepository jobVehicleAttenctionsRepository;

    @Autowired
    private MFinalCheckListItemRepostory finalCheckListItemRepostory;

    @Autowired
    private TJobFinalCheckListRepository tJobFinalCheckListRepository;

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

        JobCard getSaveData = jobCardRepository.save(jobCard);

        //check allrady exsist data
        List<TJobVehicleAttenctions> getJobCardData = jobVehicleAttenctionsRepository.findByJobCard(getSaveData.getIndexNo());
        if (getJobCardData.isEmpty()) {
            List< MVehicleAttenctions> vehicleAttenctionsList = attenctionRepository.findAll();
            for (MVehicleAttenctions mVehicleAttenctions : vehicleAttenctionsList) {

                TJobVehicleAttenctions jobVehicleAttenctions = new TJobVehicleAttenctions();
                jobVehicleAttenctions.setJobCard(getSaveData.getIndexNo());
                jobVehicleAttenctions.setVehicleAttenctions(mVehicleAttenctions.getIndexNo());
                jobVehicleAttenctions.setVehicleAttenctionsCategory(mVehicleAttenctions.getCategory());
                jobVehicleAttenctionsRepository.save(jobVehicleAttenctions);
            }
        } else {
            throw new DuplicateEntityException("Duplicate Data");
        }

        //save final check list data
        List<TJobFinalCheckList> getVehicleFinalCheckListData = tJobFinalCheckListRepository.findByJobCard(getSaveData.getIndexNo());
        if (getVehicleFinalCheckListData.isEmpty()) {
            List<MFinalCheckListItem> vehicleAttenctionsList = finalCheckListItemRepostory.findAll();
            for (MFinalCheckListItem mFinalCheckListItem : vehicleAttenctionsList) {

                TJobFinalCheckList jobFinalCheckList = new TJobFinalCheckList();
                jobFinalCheckList.setFinalCheckListItem(mFinalCheckListItem.getIndexNo());
                jobFinalCheckList.setVehicle(getSaveData.getVehicle());
                jobFinalCheckList.setJobCard(getSaveData.getIndexNo());
                jobFinalCheckList.setCheck(Constant.PENDING_STATUS);
                tJobFinalCheckListRepository.save(jobFinalCheckList);
                
            }
        } else {
            throw new DuplicateEntityException("Duplicate Data");
        }
        return getSaveData;
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

    List<JobCard> getNotFinishedJobCard() {
        return jobCardRepository.findByStatusNotIn(Constant.FINISHE_STATUS);
    }
}
