/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.service.job_item.model.CustomerReceiveItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kavish Manjitha
 */
@RestController
@CrossOrigin
@RequestMapping("/api/care-point/transaction/client-received-item")
public class ClientReceivedItemControlle {

    @Autowired
    private ClientReceivedItemService clientReceivedItemService;

    @RequestMapping(value = "/save-client-received-item", method = RequestMethod.POST)
    public CustomerReceiveItem saveCustomerReceiveItem(@RequestBody CustomerReceiveItem customerReceiveItem) {
        return clientReceivedItemService.saveCustomerReceiveItem(customerReceiveItem);
    }

    @RequestMapping(value = "/delete-client-received-item/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteCustomerReceiveItem(@PathVariable Integer indexNo) {
        return clientReceivedItemService.deleteCustomerReceiveItem(indexNo);
    }

    @RequestMapping(value = "/{jobCard}", method = RequestMethod.GET)
    public List<CustomerReceiveItem> findByJobCard(@PathVariable Integer jobCard) {
        return clientReceivedItemService.findByJobCard(jobCard);
    }
}
