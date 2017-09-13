/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.client;

import com.mac.care_point.master.client.model.Client;
import com.mac.care_point.zutil.SecurityUtil;
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
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/client")
public class clientController {

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Client> findAll() {
        return clientService.findAll();
    }

    @RequestMapping(value = "/insert-client", method = RequestMethod.POST)
    public Client insertDetail(@RequestBody Client client) {
        client.setBranch(SecurityUtil.getCurrentUser().getBranch());
        return clientService.saveDetail(client);
    }

    @RequestMapping(value = "/delete-client/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteDetail(@PathVariable Integer indexNo) {
        clientService.deleteDetail(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/get-new-client-list", method = RequestMethod.GET)
    public List<Client> getNewClientList() {
        return clientService.getNewClientList();
    }
}
