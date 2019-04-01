package com.loja.dora.repository.search;

import com.loja.dora.domain.OrdersLineVariant;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrdersLineVariant entity.
 */
public interface OrdersLineVariantSearchRepository extends ElasticsearchRepository<OrdersLineVariant, Long> {
}
