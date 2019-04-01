package com.loja.dora.service.mapper;

import com.loja.dora.domain.*;
import com.loja.dora.service.dto.OrdersLineVariantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrdersLineVariant and its DTO OrdersLineVariantDTO.
 */
@Mapper(componentModel = "spring", uses = {OrdersLineMapper.class})
public interface OrdersLineVariantMapper extends EntityMapper<OrdersLineVariantDTO, OrdersLineVariant> {

    @Mapping(source = "ordersLine.id", target = "ordersLineId")
    OrdersLineVariantDTO toDto(OrdersLineVariant ordersLineVariant);

    @Mapping(source = "ordersLineId", target = "ordersLine")
    @Mapping(target = "ordersLineExtras", ignore = true)
    OrdersLineVariant toEntity(OrdersLineVariantDTO ordersLineVariantDTO);

    default OrdersLineVariant fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrdersLineVariant ordersLineVariant = new OrdersLineVariant();
        ordersLineVariant.setId(id);
        return ordersLineVariant;
    }
}
