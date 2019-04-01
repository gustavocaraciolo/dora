package com.loja.dora.repository;

import com.loja.dora.domain.ShopDevice;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ShopDevice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopDeviceRepository extends JpaRepository<ShopDevice, Long>, JpaSpecificationExecutor<ShopDevice> {

}
