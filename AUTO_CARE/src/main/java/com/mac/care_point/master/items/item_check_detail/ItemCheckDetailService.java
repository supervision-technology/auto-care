/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_check_detail;

import com.mac.care_point.master.items.item_check_detail.model.MItemCheckDetail;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author L T430
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ItemCheckDetailService {

    @Autowired
    private ItemCheckDetailRepository checkDetailRepository;

    List<MItemCheckDetail> getAll() {
        return checkDetailRepository.findAll();
    }

    MItemCheckDetail saveItemCheckDetail(MItemCheckDetail itemCheckDetail) {
        return checkDetailRepository.save(itemCheckDetail);
    }

    void deleteItemCheckDetail(Integer indexNo) {
        checkDetailRepository.delete(indexNo);
    }

}
