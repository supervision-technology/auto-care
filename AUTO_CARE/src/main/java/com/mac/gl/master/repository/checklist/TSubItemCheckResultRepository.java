/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.checklist;

import com.mac.gl.master.model.item.MItem;
import com.mac.gl.master.model.item.TSubItemCheckResult;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface TSubItemCheckResultRepository extends JpaRepository<TSubItemCheckResult, Integer> {

    public List<TSubItemCheckResult> findByBranchAndSubItemItem(Integer branch, MItem item);

    public List<TSubItemCheckResult> findByBranchAndSubItemItemAndChecked(Integer branch, MItem item, Boolean cheked);
}
