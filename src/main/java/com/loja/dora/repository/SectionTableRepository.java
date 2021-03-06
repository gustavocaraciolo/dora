package com.loja.dora.repository;

import com.loja.dora.domain.SectionTable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the SectionTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SectionTableRepository extends JpaRepository<SectionTable, Long>, JpaSpecificationExecutor<SectionTable> {
    List<SectionTable> findAllByShopSectionsId(Long shopSectionsId);

}
