package com.loja.dora.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.loja.dora.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.loja.dora.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Company.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Shop.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Shop.class.getName() + ".profiles", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Shop.class.getName() + ".productCategories", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Shop.class.getName() + ".productTypes", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Shop.class.getName() + ".systemConfigs", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Shop.class.getName() + ".discounts", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Shop.class.getName() + ".taxes", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.ShopSection.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.SectionTable.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.SystemEventsHistory.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Product.class.getName() + ".variants", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Product.class.getName() + ".extras", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.ProductCategory.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.ProductCategory.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.ProductVariant.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.ProductExtra.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.ProductType.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.SystemConfig.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.EmailBalancer.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Profile.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.EmployeeTimesheet.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Orders.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Orders.class.getName() + ".ordersLines", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.OrdersLine.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.OrdersLine.class.getName() + ".ordersLineVariants", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.OrdersLineVariant.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.OrdersLineVariant.class.getName() + ".ordersLineExtras", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.OrdersLineExtra.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Discount.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Discount.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Tax.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Tax.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.PaymentMethod.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.SuspensionHistory.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.ShopDevice.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.PaymentMethodConfig.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.Payment.class.getName(), jcacheConfiguration);
            cm.createCache(com.loja.dora.domain.ShopChange.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
