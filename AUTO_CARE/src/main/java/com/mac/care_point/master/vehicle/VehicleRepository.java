/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.vehicle;

import com.mac.care_point.master.vehicle.model.Vehicle;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Supervision
 */
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    public Vehicle findByVehicleNo(String vehicleNo);

//    @Query("select job from m_vehicle job where job.jobNo in (select max(cast(jobx.jobNo as int)) from JobSummary jobx where jobx.vehicleNo like %:vehicleNo1% or jobx.vehicleNo like %:vehicleNo2% or jobx.vehicleNo like %:vehicleNo3% group by jobx.vehicleNo)")
//    @Query(value = "select vehNo.vehicle_no from m_vehicle vehNo where vehNo.vehicle_no like concat('%',vehicleNo1,'%') or vehNo.vehicle_no like concat('%',vehicleNo2,'%') or vehNo.vehicle_no like concat('%',vehicleNo3,'%') group by vehNo.vehicle_no",nativeQuery = true)
    @Query(value = "select * from m_vehicle vehNo where vehNo.vehicle_no like CONCAT('%',:vehicleNo1,'%') or vehNo.vehicle_no like CONCAT('%',:vehicleNo2,'%') or vehNo.vehicle_no like CONCAT('%',:vehicleNo3,'%')", nativeQuery = true)
    public List<Vehicle> findByVehicleNoLike(
            @Param("vehicleNo1") String vehicleNo1,
            @Param("vehicleNo2") String vehicleNo2,
            @Param("vehicleNo3") String vehicleNo3);

    default List<Vehicle> findByVehicleNoLikeLimit10(String vehicleNo1, String vehicleNo2, String vehicleNo3) {
        return findByVehicleNoLike(vehicleNo1, vehicleNo2, vehicleNo3);
    }

}
