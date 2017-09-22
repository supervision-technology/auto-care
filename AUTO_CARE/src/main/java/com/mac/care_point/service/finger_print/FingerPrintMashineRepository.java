/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.finger_print;

import com.mac.care_point.service.finger_print.model.TFingerPrintMashine;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author 'Kasun Chamara'
 */
public interface FingerPrintMashineRepository extends JpaRepository<TFingerPrintMashine, Integer>{

    public List<TFingerPrintMashine> findByBranch(Integer branch);
    
}
