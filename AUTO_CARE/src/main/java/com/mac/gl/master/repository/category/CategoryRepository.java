/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.category;

import com.mac.gl.master.model.category.MCategory;
import com.mac.gl.master.model.itemdepartment.MItemDepartment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface CategoryRepository extends JpaRepository<MCategory, Integer> {

    public List<MCategory> findByName(String name);

    public List<MCategory> findByDepartment(MItemDepartment itemDepartment);

}
