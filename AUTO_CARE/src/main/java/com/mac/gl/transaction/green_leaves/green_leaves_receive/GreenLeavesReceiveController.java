package com.mac.gl.transaction.green_leaves.green_leaves_receive;

import com.mac.gl.system.http.HttpRespondBuilder;
import com.mac.gl.system.http.HttpRespondModel;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.http.request.FactoryQuantityRequest;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.http.request.SaveOrUpdateLeavesReceiveRequest;
import com.mac.gl.transaction.green_leaves.model.MClient;
import com.mac.gl.transaction.green_leaves.model.MEmployee;
import com.mac.gl.transaction.green_leaves.model.MRoute;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeaveWeighDetails;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetails;
import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Don
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/green-leaves-receive")
public class GreenLeavesReceiveController {

    @Autowired
    private GreenLeavesReceiveService greenLeavesReceiveService;

    private static final int ROUTE = 2;
    private static final int BRANCH = 1;
    private final Date DATE = java.sql.Date.valueOf("2016-09-13");

    //Returns all active routes
    @RequestMapping(value = "/routes", method = RequestMethod.GET)
    public HttpRespondModel allRoutes() {
        List<MRoute> routeResponds = greenLeavesReceiveService.getRoutes(BRANCH);
        return HttpRespondBuilder.successRespond(routeResponds);
    }

    //Returns all active route officers
    @RequestMapping(value = "/route-officers", method = RequestMethod.GET)
    public HttpRespondModel routeOfficers() {
        List<MEmployee> employeeResponds = greenLeavesReceiveService.getRouteOfficers(BRANCH);
        return HttpRespondBuilder.successRespond(employeeResponds);
    }

    //Returns all active route helper
    @RequestMapping(value = "/route-helpers", method = RequestMethod.GET)
    public HttpRespondModel routeHelpers() {
        List<MEmployee> routeResponds = greenLeavesReceiveService.getHelpers(BRANCH);
        return HttpRespondBuilder.successRespond(routeResponds);
    }

    //Returns all active green leaves suppliers
    @RequestMapping(value = "/clients", method = RequestMethod.GET)
    public HttpRespondModel clients() {
        List<MClient> clientRespond = greenLeavesReceiveService.getClients(BRANCH);
        return HttpRespondBuilder.successRespond(clientRespond);
    }

    //Returns total green leaves weigh summary for specified date and route
    @RequestMapping(value = "/factory-quantity", method = RequestMethod.POST)
    public HttpRespondModel factoryQuantity(@RequestBody FactoryQuantityRequest factoryQtyRequest) {
        TGreenLeaveWeighDetails tGreenLeavesWeighDetails = greenLeavesReceiveService.getTotalGreenleavesWeigh(factoryQtyRequest.getRoute(), factoryQtyRequest.getDate(), BRANCH);
        return HttpRespondBuilder.successRespond(tGreenLeavesWeighDetails);
    }

    //Returns green leaves receive information for specified date and route
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public HttpRespondModel get(@RequestBody FactoryQuantityRequest factoryQtyRequest) {
        List<TGreenLeavesReceiveDetails> list = greenLeavesReceiveService.getLeavesInfomaction(factoryQtyRequest.getRoute(), factoryQtyRequest.getDate(), BRANCH);
        return HttpRespondBuilder.successRespond(list);
    }

    //Save or update green leaves receive information
    @RequestMapping(value = "/save-or-update", method = RequestMethod.POST)
    public void saveOrUpdate(@RequestBody SaveOrUpdateLeavesReceiveRequest receiveRequest) {
//        SaveOrUpdateLeavesReceiveRequest saveOrUpdateLeavesReceiveRequest = new SaveOrUpdateLeavesReceiveRequest();
//        saveOrUpdateLeavesReceiveRequest.setBranch(3);
//        saveOrUpdateLeavesReceiveRequest.setClient(1);
//        saveOrUpdateLeavesReceiveRequest.setIndexNo(19);
//        saveOrUpdateLeavesReceiveRequest.setDate(DATE);
//        saveOrUpdateLeavesReceiveRequest.setNormalLeavesQuantity(5.0);
//        saveOrUpdateLeavesReceiveRequest.setNumber(1);
//        saveOrUpdateLeavesReceiveRequest.setRoute(1);
//        saveOrUpdateLeavesReceiveRequest.setSuperLeavesQuantity(6.0);
//        saveOrUpdateLeavesReceiveRequest.setTransaction(1);
        boolean saveOrUpdate = greenLeavesReceiveService.updateTGreenLeavesReceiveDetails(receiveRequest);
        if (saveOrUpdate) {
            System.out.println("saveOrUpdate sucsses");
        } else {
            System.out.println("saveOrUpdate fail");
        }
    }
}
