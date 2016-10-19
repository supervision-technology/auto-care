/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.transaction.green_leaves.green_leaves_receive.repository;

import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeaveWeighDetails;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Don
 */
public interface GreenLeavesWeighRepository extends JpaRepository<TGreenLeaveWeighDetails, Integer> {

    @Query(value = "SELECT sum(normal_leaves_quantity) as total_normal_leaves_quantity, sum(super_leaves_quantity) as total_super_leaves_quantity FROM t_green_leave_weigh LEFT JOIN t_green_leave_weigh_detail ON t_green_leave_weigh.index_no = t_green_leave_weigh_detail.green_leave_weigh where t_green_leave_weigh.index_no = :route and date = :date and t_green_leave_weigh.branch = :branch", nativeQuery = true)
    public List<Object[]> findByGreenLeavesWeighRouteIndexNoAndGreenLeavesWeighDateAndGreenLeavesWeighBranch(@Param("route") Integer route, @Param("date") Date date, @Param("branch") Integer branch);
}
