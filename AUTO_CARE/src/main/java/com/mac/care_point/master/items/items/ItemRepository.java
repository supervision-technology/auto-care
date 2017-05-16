/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.items;

import com.mac.care_point.master.items.items.model.MItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kavish Manjitha
 */
public interface ItemRepository extends JpaRepository<MItem, Integer> {

    public List<MItem> findByType(String type);

    public List<MItem> findByCategoryAndPriceCategory(Integer category, Integer packageCategory);

//    public List<MItem> findByBranchAndType(int BRANCH, String TYPE);

    public List<MItem> findByTypeOrType(String stock, String nonStock);
}
