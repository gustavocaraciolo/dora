package com.loja.dora.repository.search;

import com.loja.dora.domain.PaymentMethod;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PaymentMethod entity.
 */
public interface PaymentMethodSearchRepository extends ElasticsearchRepository<PaymentMethod, Long> {
}
