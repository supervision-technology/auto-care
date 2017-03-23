/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.client;

import com.mac.care_point.service.zmaster.client.model.MClient;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Kalum
 */
@Service
public class SVClientService {
    
    @Autowired
    private SVClientRepository clientRepository;
    
    public List<MClient> getAllClient() {
        return clientRepository.findAll();
    }

    public MClient getClientByIndexNo(Integer indexNo) {
        return clientRepository.findOne(indexNo);
    }

    public MClient saveClient(MClient client) {
        return  clientRepository.save(client);
    }
    
}
