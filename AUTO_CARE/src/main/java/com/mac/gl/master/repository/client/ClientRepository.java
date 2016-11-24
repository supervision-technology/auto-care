/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.client;

import com.mac.gl.master.model.client.Client;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Supervision
 */
public interface ClientRepository extends JpaRepository<Client, Integer>{

    public List<Client> findByNic(String nic);
 
}
