package com.loja.dora.repository.search;

import com.loja.dora.domain.SectionTable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SectionTable entity.
 */
public interface SectionTableSearchRepository extends ElasticsearchRepository<SectionTable, Long> {
}
