package com.mac.gl.transaction.green_leaves.repository;

import com.mac.gl.transaction.green_leaves.model.MEmployee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Don
 */
public interface EmployeeRepository extends JpaRepository<MEmployee, Integer> {

    public List<MEmployee> findByTypeAndBranch(String route_officer, Integer branch);
}
