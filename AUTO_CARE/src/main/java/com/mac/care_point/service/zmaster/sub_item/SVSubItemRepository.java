/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.sub_item;

import com.mac.care_point.service.zmaster.sub_item.model.MSubItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author Kalum
 */
public interface SVSubItemRepository extends JpaRepository<MSubItem, Integer> {

    @Query(value = "select \n"
            + "item,\n"
            + "count(*)\n"
            + "from \n"
            + "  m_sub_item\n"
            + "group by item", nativeQuery = true)
    public List<Object[]> getItems();

    public List<MSubItem> findByItem(Integer item);
}
