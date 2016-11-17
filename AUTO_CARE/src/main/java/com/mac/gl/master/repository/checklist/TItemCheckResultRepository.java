/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.checklist;

import com.mac.gl.master.model.item.TItemCheckResult;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface TItemCheckResultRepository extends JpaRepository<TItemCheckResult, Integer> {

    public List<TItemCheckResult> findByBranch(Integer branch);

}
