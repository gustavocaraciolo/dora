package com.loja.dora.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of OrdersLineSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class OrdersLineSearchRepositoryMockConfiguration {

    @MockBean
    private OrdersLineSearchRepository mockOrdersLineSearchRepository;

}
