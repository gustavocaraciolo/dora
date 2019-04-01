package com.loja.dora.repository.search;

import com.loja.dora.domain.PaymentMethodConfig;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PaymentMethodConfig entity.
 */
public interface PaymentMethodConfigSearchRepository extends ElasticsearchRepository<PaymentMethodConfig, Long> {
}
