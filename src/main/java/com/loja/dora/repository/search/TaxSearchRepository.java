package com.loja.dora.repository.search;

import com.loja.dora.domain.Tax;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Tax entity.
 */
public interface TaxSearchRepository extends ElasticsearchRepository<Tax, Long> {
}
