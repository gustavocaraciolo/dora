package com.loja.dora.repository.search;

import com.loja.dora.domain.ShopSection;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ShopSection entity.
 */
public interface ShopSectionSearchRepository extends ElasticsearchRepository<ShopSection, Long> {
}
