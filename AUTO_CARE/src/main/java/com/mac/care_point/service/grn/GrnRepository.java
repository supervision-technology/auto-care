/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.grn;

import com.mac.care_point.service.grn.model.TGrn;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author L T430
 */
public interface GrnRepository extends JpaRepository<TGrn, Integer> {

    public List<TGrn> findAll();

    public TGrn findFirst1ByOrderByIndexNoDesc();

    public List<TGrn> findByBranchAndStatus(Integer branch, String status_pending);

}
