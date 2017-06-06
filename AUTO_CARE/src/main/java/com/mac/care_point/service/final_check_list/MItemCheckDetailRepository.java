/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.final_check_list;

import com.mac.care_point.service.final_check_list.model.MItemCheckDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kavish manjitha
 */
public interface MItemCheckDetailRepository extends JpaRepository<MItemCheckDetail, Integer>{

    public List<MItemCheckDetail> findByItem(Integer item);
    
}
