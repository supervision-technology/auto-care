/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.repository.item;

import com.mac.care_point.master.model.item.MItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */
public interface ItemRepository extends JpaRepository<MItem, Integer> {

    public List<MItem> findByName(String name);

    public List<MItem> findByType(String type);

}
