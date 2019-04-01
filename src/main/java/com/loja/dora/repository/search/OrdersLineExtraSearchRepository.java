package com.loja.dora.repository.search;

import com.loja.dora.domain.OrdersLineExtra;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrdersLineExtra entity.
 */
public interface OrdersLineExtraSearchRepository extends ElasticsearchRepository<OrdersLineExtra, Long> {
}
