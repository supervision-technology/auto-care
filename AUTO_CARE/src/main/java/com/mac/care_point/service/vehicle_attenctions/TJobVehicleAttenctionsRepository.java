/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.vehicle_attenctions;

import com.mac.care_point.service.vehicle_attenctions.model.TJobVehicleAttenctions;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author kavish manjitha
 */
public interface TJobVehicleAttenctionsRepository extends JpaRepository<TJobVehicleAttenctions, Integer> {

    public List<TJobVehicleAttenctions> findByJobCardAndVehicleAttenctionsCategory(Integer jobCard, Integer category);

    @Query(value = "select\n"
            + "	* \n"
            + "from\n"
            + "	(select index_no from t_job_card where vehicle = :vehicle order by number desc limit 2) a\n"
            + "order by\n"
            + "	index_no\n"
            + "limit 1", nativeQuery = true)
    public Integer getLastJobCardVehicle(@Param("vehicle") Integer vehicle);

    public List<TJobVehicleAttenctions> findByJobCard(Integer jobCard);

    public List<TJobVehicleAttenctions> findByJobCardAndStatusNotNull(Integer jobCard);
}
