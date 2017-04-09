/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn;

import com.mac.care_point.service.grn.model.TGrn;
import com.mac.care_point.service.grn.model.TGrnItem;
import java.math.BigDecimal;
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
public class GrnService {

    @Autowired
    private GrnRepository grnRepository;

    List<TGrn> getAllGrn() {
        return grnRepository.findAll();
    }

    List<Object[]> getSupplierGrnPaymentHistory(Integer supplier) {
        System.out.println(supplier);
        System.out.println("supplier");
        return grnRepository.getSupplierGrnPaymentHistory(supplier);
    }

    @Transactional
    public TGrn saveGrn(TGrn grn) {
        TGrn findLastRow = grnRepository.findFirst1ByOrderByIndexNoDesc();

        if (findLastRow != null) {
            grn.setNumber(findLastRow.getNumber() + 1);
        } else {
            grn.setNumber(1);
        }
        
        for (TGrnItem item : grn.getGrnItemList()) {
            System.out.println("#########################");
            item.setGrn(grn);
            item.setValue(new BigDecimal(item.getQty().doubleValue() * item.getUnitPrice().doubleValue()));
            item.setNetValue(item.getValue());
            item.setDiscount(new BigDecimal(0));
        }
        return grnRepository.save(grn);
    }

}
