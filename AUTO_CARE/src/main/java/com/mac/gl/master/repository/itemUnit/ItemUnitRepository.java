/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.itemUnit;

import com.mac.gl.master.model.itemUnit.MItemUnit;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface ItemUnitRepository extends JpaRepository<MItemUnit, Serializable> {

    public List<MItemUnit> findByItemIndexNo(Integer indexNo);

}
