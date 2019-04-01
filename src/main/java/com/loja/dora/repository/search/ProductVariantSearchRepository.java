package com.loja.dora.repository.search;

import com.loja.dora.domain.ProductVariant;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductVariant entity.
 */
public interface ProductVariantSearchRepository extends ElasticsearchRepository<ProductVariant, Long> {
}
