package com.loja.dora.repository.search;

import com.loja.dora.domain.SystemConfig;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SystemConfig entity.
 */
public interface SystemConfigSearchRepository extends ElasticsearchRepository<SystemConfig, Long> {
}
