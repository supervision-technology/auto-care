package com.mac.gl.transaction.green_leaves.green_leaves_receive.repository;

import com.mac.gl.transaction.green_leaves.green_leaves_receive.model.TGreenLeavesReceiveDetails;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Don
 */
public interface GreenLeavesReceiveDetailsRepository extends JpaRepository<TGreenLeavesReceiveDetails, Integer> {

    public List<TGreenLeavesReceiveDetails> findByGreenLeavesReceiveRouteIndexNoAndGreenLeavesReceiveDateAndGreenLeavesReceiveBranch(Integer route, Date date, Integer branch);
}
