package com.loja.dora.repository;

import com.loja.dora.domain.OrdersLine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrdersLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdersLineRepository extends JpaRepository<OrdersLine, Long>, JpaSpecificationExecutor<OrdersLine> {

}
