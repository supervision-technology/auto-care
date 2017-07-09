/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.item_category;

import com.mac.care_point.master.item_category.model.MItemCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kavish manjitha
 */
public interface ItemCategoryRepository extends JpaRepository<MItemCategory, Integer> {

    public List<MItemCategory> findByName(String name);

    public List<MItemCategory> findByViewApprove(boolean viewApprove);

}
