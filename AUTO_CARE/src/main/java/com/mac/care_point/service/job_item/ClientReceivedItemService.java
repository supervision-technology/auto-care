/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.service.job_item.model.CustomerReceiveItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ClientReceivedItemService {

    @Autowired
    private ClientReceivedItemRepository clientReceivedItemRepository;

    
    //save client receive item from service selection
    public CustomerReceiveItem saveCustomerReceiveItem(CustomerReceiveItem customerReceiveItem) {
        return clientReceivedItemRepository.save(customerReceiveItem);
    }

    //delete customer received item for service selection
    public Integer deleteCustomerReceiveItem(Integer indexNo) {
        clientReceivedItemRepository.delete(indexNo);
        return indexNo;
    }
    
    //find by job card no from service selection
    public List<CustomerReceiveItem> findByJobCard(Integer indexNo){
        return clientReceivedItemRepository.findByJobCard(indexNo);
    }
}
