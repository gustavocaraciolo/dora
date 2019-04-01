package com.loja.dora.repository;

import com.loja.dora.domain.PaymentMethodConfig;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the PaymentMethodConfig entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentMethodConfigRepository extends JpaRepository<PaymentMethodConfig, Long>, JpaSpecificationExecutor<PaymentMethodConfig> {

    List<PaymentMethodConfig> findAllByPaymentMethodId(Long paymentMethodId);
}
