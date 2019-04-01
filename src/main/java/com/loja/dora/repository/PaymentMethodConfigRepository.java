package com.loja.dora.repository;

import com.loja.dora.domain.PaymentMethodConfig;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PaymentMethodConfig entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentMethodConfigRepository extends JpaRepository<PaymentMethodConfig, Long>, JpaSpecificationExecutor<PaymentMethodConfig> {

}
