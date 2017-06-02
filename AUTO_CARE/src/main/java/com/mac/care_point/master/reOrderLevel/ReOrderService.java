/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.reOrderLevel;

import com.mac.care_point.master.reOrderLevel.model.MReOrderLevel;
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
public class ReOrderService {

    @Autowired
    private ReOrderRepository reOrderRepository;

    List<MReOrderLevel> findAll() {
        return reOrderRepository.findAll();
    }

    Integer save(MReOrderLevel item) {
        List<MReOrderLevel> list = reOrderRepository.findByBranchAndItem(item.getBranch(), item.getItem());

        MReOrderLevel saveObject = null;
        if (list.isEmpty()) {
            saveObject = reOrderRepository.save(item);
        } else {
            MReOrderLevel reOrder = list.get(0);
            reOrder.setReOrderMax(item.getReOrderMax());
            reOrder.setReOrderMin(item.getReOrderMin());
            saveObject = reOrderRepository.save(reOrder);
        }
        return saveObject.getIndexNo();
    }
}
