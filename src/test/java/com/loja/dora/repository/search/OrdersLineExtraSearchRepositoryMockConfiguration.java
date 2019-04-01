package com.loja.dora.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of OrdersLineExtraSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class OrdersLineExtraSearchRepositoryMockConfiguration {

    @MockBean
    private OrdersLineExtraSearchRepository mockOrdersLineExtraSearchRepository;

}
