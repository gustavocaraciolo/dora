package com.loja.dora.repository.search;

import com.loja.dora.domain.ShopDevice;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ShopDevice entity.
 */
public interface ShopDeviceSearchRepository extends ElasticsearchRepository<ShopDevice, Long> {
}
