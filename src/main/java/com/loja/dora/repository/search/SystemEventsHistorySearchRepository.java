package com.loja.dora.repository.search;

import com.loja.dora.domain.SystemEventsHistory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SystemEventsHistory entity.
 */
public interface SystemEventsHistorySearchRepository extends ElasticsearchRepository<SystemEventsHistory, Long> {
}
