/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.vehicle;

import com.mac.care_point.service.zmaster.vehicle.model.MVehicle;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kalum
 */
public interface SVVehicleRepository extends JpaRepository<MVehicle, Integer> {

    public List<MVehicle> findVehicleByIndexNo(Integer indexNo);

    public MVehicle findVehicleByVehicleNo(String vehicleNo);

    public List<MVehicle> findByVehicleNo(String vehicleNo);

    public List<MVehicle> findByIsNewOrderByVehicleNo(boolean b);

    @Query(value = "select GROUP_CONCAT(m_vehicle.vehicle_no SEPARATOR \" , \") as vehicle_nos from m_vehicle where m_vehicle.`client` =:client ", nativeQuery = true)
    public String getAllVehiclesByClient(@Param("client") Integer client);

    @Query(value = "select m_vehicle.brand\n"
            + "from m_vehicle\n"
            + "where m_vehicle.brand is not null\n"
            + "group by m_vehicle.brand", nativeQuery = true)
    public List<String> getBrandList();

    @Query(value = "select m_vehicle.model\n"
            + "from m_vehicle\n"
            + "where m_vehicle.model is not null\n"
            + "group by m_vehicle.model", nativeQuery = true)
    public List<String> getModelList();

    @Query(value = "select m_vehicle.fuel_type\n"
            + "from m_vehicle\n"
            + "where m_vehicle.fuel_type is not null\n"
            + "group by m_vehicle.fuel_type", nativeQuery = true)
    public List<String> getFuelTypeList();

}