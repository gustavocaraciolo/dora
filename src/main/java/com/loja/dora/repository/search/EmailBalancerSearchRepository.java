package com.loja.dora.repository.search;

import com.loja.dora.domain.EmailBalancer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EmailBalancer entity.
 */
public interface EmailBalancerSearchRepository extends ElasticsearchRepository<EmailBalancer, Long> {
}
