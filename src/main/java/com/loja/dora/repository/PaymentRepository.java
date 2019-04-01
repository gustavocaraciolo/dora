package com.loja.dora.repository;

import com.loja.dora.domain.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Payment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>, JpaSpecificationExecutor<Payment> {

    List<Payment> findAllByOrderId(Long orderId);

    Page<Payment> findAllByOrderId(Pageable pageable, Long orderId);

    Page<Payment> findAllByShopId(Pageable pageable, Long shopId);
}
