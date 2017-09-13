/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.mac.care_point.master.client;

import com.mac.care_point.master.client.model.Client;
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
        try {
            clientRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this client because there are details in other transaction");
        }
    }

    public List<Client> getNewClientList() {
        return clientRepository.findByIsNewOrderByName(true);
    }

}
