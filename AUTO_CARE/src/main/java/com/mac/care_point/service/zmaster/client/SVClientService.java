/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.client;

import com.mac.care_point.service.zmaster.client.model.MClient;
import com.mac.care_point.service.zmaster.client.model.MClientDTO;
import com.mac.care_point.service.zmaster.vehicle.SVVehicleRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SVClientService {

    @Autowired
    private SVClientRepository clientRepository;

    @Autowired
    private SVVehicleRepository vehicleRepository;

    public List<MClientDTO> getAllClient() {
        List<MClientDTO> clientVehicleList =new ArrayList<>();
        List<MClient> clientList1 = clientRepository.findAll();
        for (MClient client : clientList1) {
            MClientDTO clientDTO = new MClientDTO();
            clientDTO.setIndexNo(client.getIndexNo());
            clientDTO.setName(client.getName());
            clientDTO.setNic(client.getNic());
            clientDTO.setAddressLine1(client.getAddressLine1());
            clientDTO.setAddressLine2(client.getAddressLine2());
            clientDTO.setAddressLine3(client.getAddressLine3());
            clientDTO.setBranch(client.getBranch());
            clientDTO.setMobile(client.getMobile());
            clientDTO.setResident(client.getResident());
            clientDTO.setCustomerType(client.getCustomerType());
            clientDTO.setIsNew(client.isIsNew());
            clientDTO.setDate(client.getDate());
            clientDTO.setVehicles(getAllVehiclesByClient(clientDTO.getIndexNo()));
            clientVehicleList.add(clientDTO);
        }
        return clientVehicleList;
    }

    public MClientDTO getClientByIndexNo(Integer indexNo) {
        MClientDTO clientDTO = new MClientDTO();
        MClient client = clientRepository.findOne(indexNo);
        clientDTO.setIndexNo(client.getIndexNo());
        clientDTO.setName(client.getName());
        clientDTO.setNic(client.getNic());
        clientDTO.setAddressLine1(client.getAddressLine1());
        clientDTO.setAddressLine2(client.getAddressLine2());
        clientDTO.setAddressLine3(client.getAddressLine3());
        clientDTO.setBranch(client.getBranch());
        clientDTO.setMobile(client.getMobile());
        clientDTO.setResident(client.getResident());
        clientDTO.setCustomerType(client.getCustomerType());
        clientDTO.setVehicles(getAllVehiclesByClient(clientDTO.getIndexNo()));
        return clientDTO;
    }

    public String getAllVehiclesByClient(Integer client) {
        return vehicleRepository.getAllVehiclesByClient(client);
    }

    public MClient saveClient(MClient client) {
        client.setBranch(1);
        client.setMobile("94" + client.getMobile());
        return clientRepository.save(client);
    }

}
