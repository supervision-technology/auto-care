/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.client;

import com.mac.care_point.service.zmaster.client.model.MClient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kalum
 */
public interface SVClientRepository extends JpaRepository<MClient, Integer>{

    @Query(value = "select * from m_client where m_client.mobile like CONCAT('%',:mobile,'%') or m_client.name like CONCAT('%',:name,'%')  limit 5",nativeQuery = true)
    public List<MClient> getClientByMobileNoAndName(
            @Param("name")String name,
            @Param("mobile")String mobile);
    
}
