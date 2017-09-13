/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.final_check_list;

import com.mac.care_point.service.final_check_list.model.MItemCheckDetail;
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
public class MItemCheckDetailService {

    @Autowired
    private MItemCheckDetailRepository itemCheckDetailRepository;

    public List<MItemCheckDetail> findAll() {
        return itemCheckDetailRepository.findAll();
    }
    
    public List<MItemCheckDetail> findByItem(Integer item) {
        return itemCheckDetailRepository.findByItem(item);
    }

}
