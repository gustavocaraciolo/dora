package com.loja.dora.repository.search;

import com.loja.dora.domain.SuspensionHistory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SuspensionHistory entity.
 */
public interface SuspensionHistorySearchRepository extends ElasticsearchRepository<SuspensionHistory, Long> {
}
