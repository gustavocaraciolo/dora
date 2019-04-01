package com.loja.dora.service.mapper;

import com.loja.dora.domain.*;
import com.loja.dora.service.dto.SystemConfigDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SystemConfig and its DTO SystemConfigDTO.
 */
@Mapper(componentModel = "spring", uses = {ShopMapper.class})
public interface SystemConfigMapper extends EntityMapper<SystemConfigDTO, SystemConfig> {

    @Mapping(source = "shop.id", target = "shopId")
    @Mapping(source = "shop.shopName", target = "shopShopName")
    SystemConfigDTO toDto(SystemConfig systemConfig);

    @Mapping(source = "shopId", target = "shop")
    SystemConfig toEntity(SystemConfigDTO systemConfigDTO);

    default SystemConfig fromId(Long id) {
        if (id == null) {
            return null;
        }
        SystemConfig systemConfig = new SystemConfig();
        systemConfig.setId(id);
        return systemConfig;
    }
}
