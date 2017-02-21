/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.vehicle;

import com.mac.care_point.master.client.ClientRepository;
import com.mac.care_point.master.client.model.Client;
import com.mac.care_point.master.vehicle.model.Vehicle;
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
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public Vehicle saveDetail(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public void deleteDetail(Integer indexNo) {
        vehicleRepository.delete(indexNo);
    }

    public Vehicle saveNewClientAndNEwVehicle(Vehicle vehicle) {
        if (vehicle.getClient().getIndexNo() == null) {
            Client client = clientRepository.save(vehicle.getClient());
            vehicle.setClient(client);
            return vehicleRepository.save(vehicle);
        } else {
            return vehicleRepository.save(vehicle);
        }
    }
}
