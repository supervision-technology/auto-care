/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.client;

import com.mac.gl.master.model.client.Client;
import com.mac.gl.master.model.priceCategory.PriceCategory;
import com.mac.gl.master.repository.client.ClientRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
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

    private Client findByNic(String nic) {
        List<Client> findByNic = clientRepository.findByNic(nic);
        if (findByNic.isEmpty()) {
            return null;
        }
        return findByNic.get(0);
    }

    public Client saveDetail(Client client) {
        Client client1 = findByNic(client.getNic());
        if (client1 == null) {
            return clientRepository.save(client);
        } else {
            if (client1.getIndexNo().equals(client.getIndexNo())) {
                return clientRepository.save(client);
            }
            throw new DuplicateEntityException("Duplicate NIC");
        }
    }    
    

    public void deleteDetail(Integer indexNo) {
        clientRepository.delete(indexNo);
    }

}
