package com.loja.dora.repository.search;

import com.loja.dora.domain.OrdersLine;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrdersLine entity.
 */
public interface OrdersLineSearchRepository extends ElasticsearchRepository<OrdersLine, Long> {
}
