/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.final_check_list;

import com.mac.care_point.master.vehicleAssignment.VehicleAssignmentRepository;
import com.mac.care_point.master.vehicleAssignment.model.TVehicleAssignment;
import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.final_check_list.model.MFinalCheckListItem;
import com.mac.care_point.service.final_check_list.model.TJobFinalCheckList;
import com.mac.care_point.service.final_check_list.model.TJobItemCheck;
import com.mac.care_point.service.job_card.JobCardRepository;
import com.mac.care_point.service.job_card.model.JobCard;
import com.mac.care_point.service.job_item.JobItemRepository;
import com.mac.care_point.service.job_item.model.TJobItem;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    @Autowired
    private MFinalCheckListItemRepostory finalCheckListItemRepostory;

    @Autowired
    private TJobFinalCheckListRepository tJobFinalCheckListRepository;

    @Autowired
    private VehicleAssignmentRepository vehicleAssignmentRepository;

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

    public TJobFinalCheckList saveTJobFinalCheckList(TJobFinalCheckList tJobFinalCheckList) {
        if (tJobFinalCheckList.getCheck().equals(Constant.PENDING_STATUS)) {
            tJobFinalCheckList.setDateTime(null);
        } else {
            tJobFinalCheckList.setDateTime(new Date());
        }

        TJobFinalCheckList getSaveDate = tJobFinalCheckListRepository.save(tJobFinalCheckList);

        //get job card default final check list status update
        JobCard getJobCardData = jobCardRepository.findOne(tJobFinalCheckList.getJobCard());

        List<TJobFinalCheckList> findPendingFinalCheckList = tJobFinalCheckListRepository.findByJobCardAndCheck(tJobFinalCheckList.getJobCard(), Constant.PENDING_STATUS);
        if (findPendingFinalCheckList.isEmpty()) {
            getJobCardData.setDefaultFinalCheck(Boolean.TRUE);
        } else {
            getJobCardData.setDefaultFinalCheck(Boolean.FALSE);
        }
//        if (getJobCardData.getInvoice()) {
//            getJobCardData.setStatus(Constant.FINISHE_STATUS);
//        }
        getJobCardData.setRate(0);//default Rate

        jobCardRepository.save(getJobCardData);

        // vehicle asignment
        if (getJobCardData.getInvoice()) {

            List<TVehicleAssignment> updatedObjects = vehicleAssignmentRepository.findTop1ByJobCardOrderByInTimeDesc(getJobCardData.getIndexNo());
            if (!updatedObjects.isEmpty()) {
                TVehicleAssignment updateVehicleAssignment = updatedObjects.get(0);
                if (updateVehicleAssignment.getOutTime() == null) {
                    updateVehicleAssignment.setOutTime(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
                }
                vehicleAssignmentRepository.save(updateVehicleAssignment);
            }
        }

        return getSaveDate;
    }

    public List<TJobFinalCheckList> findByTJobFinalCheckList(Integer jobCard) {
        return tJobFinalCheckListRepository.findByJobCard(jobCard);
    }

    public List<MFinalCheckListItem> allMFinalCheckListItem() {
        return finalCheckListItemRepostory.findAll();
    }

}
