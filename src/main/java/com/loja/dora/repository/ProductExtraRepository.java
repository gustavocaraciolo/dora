package com.loja.dora.repository;

import com.loja.dora.domain.ProductExtra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ProductExtra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductExtraRepository extends JpaRepository<ProductExtra, Long>, JpaSpecificationExecutor<ProductExtra> {
    List<ProductExtra> findAllByProductId(Long productId);
}
