/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.client;

import com.mac.gl.master.model.client.Client;
import com.mac.gl.master.repository.client.ClientRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ClientService {
    
     @Autowired
    private ClientRepository clientRepository;
    
     public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Client saveDetail(Client client) {
        return clientRepository.save(client);
    }

    public void deleteDetail(Integer indexNo) {
        clientRepository.delete(indexNo);
    }
    
}
