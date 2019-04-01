package com.loja.dora.service.mapper;

import com.loja.dora.domain.*;
import com.loja.dora.service.dto.ShopDeviceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ShopDevice and its DTO ShopDeviceDTO.
 */
@Mapper(componentModel = "spring", uses = {ShopMapper.class})
public interface ShopDeviceMapper extends EntityMapper<ShopDeviceDTO, ShopDevice> {

    @Mapping(source = "shop.id", target = "shopId")
    @Mapping(source = "shop.shopName", target = "shopShopName")
    ShopDeviceDTO toDto(ShopDevice shopDevice);

    @Mapping(source = "shopId", target = "shop")
    ShopDevice toEntity(ShopDeviceDTO shopDeviceDTO);

    default ShopDevice fromId(Long id) {
        if (id == null) {
            return null;
        }
        ShopDevice shopDevice = new ShopDevice();
        shopDevice.setId(id);
        return shopDevice;
    }
}
