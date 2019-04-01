package com.loja.dora.repository;

import com.loja.dora.domain.SystemConfig;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the SystemConfig entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SystemConfigRepository extends JpaRepository<SystemConfig, Long>, JpaSpecificationExecutor<SystemConfig> {
    List<SystemConfig> findAllByShopId(long shopId);

}
