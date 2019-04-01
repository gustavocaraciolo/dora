package com.loja.dora.repository.search;

import com.loja.dora.domain.ShopChange;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ShopChange entity.
 */
public interface ShopChangeSearchRepository extends ElasticsearchRepository<ShopChange, Long> {
}
