package com.loja.dora.repository;

import com.loja.dora.domain.OrdersLineVariant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrdersLineVariant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdersLineVariantRepository extends JpaRepository<OrdersLineVariant, Long>, JpaSpecificationExecutor<OrdersLineVariant> {

}
