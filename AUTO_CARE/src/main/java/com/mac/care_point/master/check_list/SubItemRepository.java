/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.check_list;

import com.mac.care_point.master.item.model.MItem;
import com.mac.care_point.master.item.model.MSubItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface SubItemRepository extends JpaRepository<MSubItem, Integer> {

    public List<MSubItem> findByBranchAndItem(Integer branch, MItem item);
}
