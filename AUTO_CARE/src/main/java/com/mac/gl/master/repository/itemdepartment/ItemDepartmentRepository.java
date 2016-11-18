/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.itemdepartment;

import com.mac.gl.master.model.itemdepartment.MItemDepartment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author KAZA
 */
public interface ItemDepartmentRepository extends JpaRepository<MItemDepartment, Integer> {

    public List<MItemDepartment> findByName(String name);

}
