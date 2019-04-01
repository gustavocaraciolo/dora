package com.loja.dora.repository.search;

import com.loja.dora.domain.ProductExtra;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductExtra entity.
 */
public interface ProductExtraSearchRepository extends ElasticsearchRepository<ProductExtra, Long> {
}
