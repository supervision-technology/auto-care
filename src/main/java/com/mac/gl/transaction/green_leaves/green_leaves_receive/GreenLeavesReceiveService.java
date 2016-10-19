package com.mac.gl.transaction.green_leaves.green_leaves_receive;

import com.mac.gl.transaction.green_leaves.green_leaves_receive.http.request.SaveOrUpdateLeavesReceiveRequest;
import com.mac.gl.transaction.green_leaves.model.MClient;
import com.mac.gl.transaction.green_leaves.model.MEmployee;
import com.mac.gl.transaction.green_leaves.model.MRoute;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeaveWeighDetails;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceive;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetails;
import com.mac.gl.transaction.green_leaves.repository.ClientRepository;
import com.mac.gl.transaction.green_leaves.repository.EmployeeRepository;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.GreenLeavesReceiveDetailsRepository;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.GreenLeavesReceiveRepository;
import com.mac.gl.transaction.green_leaves.green_leaves_receive.repository.GreenLeavesWeighRepository;
import com.mac.gl.transaction.green_leaves.repository.RouteRepository;
import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional
public class GreenLeavesReceiveService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private GreenLeavesReceiveDetailsRepository greenLeavesReceiveDetailsRepository;

    @Autowired
    private GreenLeavesWeighRepository greenLeavesWeighRepository;

    @Autowired
    private GreenLeavesReceiveRepository greenLeavesReceiveRepository;

    private static final String ROUTE_OFFICER = "route officer";
    private static final String ROUTE_HELPER = "route helper";

    public List<MRoute> getRoutes(Integer branch) {
        List<MRoute> list = routeRepository.findByBranch(branch);
        return list;
    }

    public List<MEmployee> getRouteOfficers(Integer branch) {
        List<MEmployee> list = employeeRepository.findByTypeAndBranch(ROUTE_OFFICER, branch);
        return list;
    }

    public List<MEmployee> getHelpers(Integer branch) {
        List<MEmployee> list = employeeRepository.findByTypeAndBranch(ROUTE_HELPER, branch);
        return list;
    }

    public List<MClient> getClients(Integer branch) {
        List<MClient> list = clientRepository.findByBranch(branch);
        return list;
    }

    public TGreenLeaveWeighDetails getTotalGreenleavesWeigh(Integer route, Date date, Integer branch) {
        List<Object[]> tGreenLeaveWeighDetailsList = greenLeavesWeighRepository.findByGreenLeavesWeighRouteIndexNoAndGreenLeavesWeighDateAndGreenLeavesWeighBranch(route, date, branch);
        TGreenLeaveWeighDetails tGreenLeavesWeighDetails = new TGreenLeaveWeighDetails();
        for (Object[] greenLeavesWeighDetail : tGreenLeaveWeighDetailsList) {
            tGreenLeavesWeighDetails.setNormalLeavesQuantity(Double.parseDouble(greenLeavesWeighDetail[0].toString()));
            tGreenLeavesWeighDetails.setSuperLeavesQuantity(Double.parseDouble(greenLeavesWeighDetail[1].toString()));
        }
        return tGreenLeavesWeighDetails;
    }

//    public TGreenLeaveWeighDetails getTotalGreenleavesWeigh(Integer route, Date date, Integer branch) {
//        List<TGreenLeaveWeighDetails> list = greenLeavesWeighRepository.findByGreenLeavesWeighRouteIndexNoAndGreenLeavesWeighDateAndGreenLeavesWeighBranch(route, date, branch);                                                                                                                                                                                         greenLeavesWeighRepository.findByGreenLeavesWeighRouteIndexNoAndGreenLeavesWeighDate(route, date);
//        Double totalNormalLeavesQuantity = 0.0;
//        Double totalSuperLeavesQuantity = 0.0;
//        for (TGreenLeaveWeighDetails tGreenLeaveWeighDetails : list) {
//            totalNormalLeavesQuantity += tGreenLeaveWeighDetails.getNormalLeavesQuantity();
//            totalSuperLeavesQuantity += tGreenLeaveWeighDetails.getSuperLeavesQuantity();
//        }
//        return new TGreenLeaveWeighDetails(totalNormalLeavesQuantity, totalSuperLeavesQuantity);
//    }
    
    public List<TGreenLeavesReceiveDetails> getLeavesInfomaction(Integer routeIndexNo, Date date, Integer branch) {
        List<TGreenLeavesReceiveDetails> list = greenLeavesReceiveDetailsRepository.findByGreenLeavesReceiveRouteIndexNoAndGreenLeavesReceiveDateAndGreenLeavesReceiveBranch(routeIndexNo, date, branch);
        return list;
    }

    public boolean updateTGreenLeavesReceiveDetails(SaveOrUpdateLeavesReceiveRequest request) {
        TGreenLeavesReceive greenLeavesReceive = new TGreenLeavesReceive();
        greenLeavesReceive.setIndexNo(request.getIndexNo());
        greenLeavesReceive.setTransaction(request.getTransaction());
        greenLeavesReceive.setNumber(request.getNumber());
        greenLeavesReceive.setBranch(request.getBranch());
        greenLeavesReceive.setDate(request.getDate());
        greenLeavesReceive.setRoute(routeRepository.getOne(request.getRoute()));
        greenLeavesReceiveRepository.save(greenLeavesReceive);

        TGreenLeavesReceiveDetails greenLeavesReceiveDetails = new TGreenLeavesReceiveDetails();
        greenLeavesReceiveDetails.setIndexNo(greenLeavesReceive.getIndexNo());
        greenLeavesReceiveDetails.setClient(clientRepository.findOne(request.getClient()));
        greenLeavesReceiveDetails.setBranch(request.getBranch());
        greenLeavesReceiveDetails.setGreenLeavesReceive(greenLeavesReceive);
        greenLeavesReceiveDetails.setNormalLeavesQuantity(request.getNormalLeavesQuantity());
        greenLeavesReceiveDetails.setSuperLeavesQuantity(request.getSuperLeavesQuantity());
        greenLeavesReceiveDetailsRepository.save(greenLeavesReceiveDetails);
        return true;
    }
}
