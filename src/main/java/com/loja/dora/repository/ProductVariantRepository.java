package com.loja.dora.repository;

import com.loja.dora.domain.ProductVariant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ProductVariant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long>, JpaSpecificationExecutor<ProductVariant> {
    List<ProductVariant> findAllByProductId(Long productId);

}
