package com.loja.dora.repository.search;

import com.loja.dora.domain.EmployeeTimesheet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EmployeeTimesheet entity.
 */
public interface EmployeeTimesheetSearchRepository extends ElasticsearchRepository<EmployeeTimesheet, Long> {
}
