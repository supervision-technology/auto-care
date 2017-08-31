/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.client;

import com.mac.care_point.service.zmaster.client.model.MClient;
import com.mac.care_point.service.zmaster.client.model.MClientDTO;
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
 * @author Kalum
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/care-point/service/zmaster/client")
public class SVClientController {
    @Autowired
    private SVClientService clientService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MClientDTO> getAllClient(){
        return clientService.getAllClient();
    }
    
    @RequestMapping(value = "/save-client", method = RequestMethod.POST)
    public MClient saveClient(@RequestBody MClient client){
        client.setBranch(SecurityUtil.getCurrentUser().getBranch());
        return clientService.saveClient(client);
    }
    
    @RequestMapping(value = "/search-client/{indexNo}",method = RequestMethod.GET)
    public MClientDTO getClientByIndex(@PathVariable Integer indexNo ){
        return clientService.getClientByIndexNo(indexNo);
    }
    
}
