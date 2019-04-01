package com.loja.dora.service.mapper;

import com.loja.dora.domain.*;
import com.loja.dora.service.dto.OrdersLineExtraDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrdersLineExtra and its DTO OrdersLineExtraDTO.
 */
@Mapper(componentModel = "spring", uses = {OrdersLineVariantMapper.class})
public interface OrdersLineExtraMapper extends EntityMapper<OrdersLineExtraDTO, OrdersLineExtra> {

    @Mapping(source = "ordersLineVariant.id", target = "ordersLineVariantId")
    OrdersLineExtraDTO toDto(OrdersLineExtra ordersLineExtra);

    @Mapping(source = "ordersLineVariantId", target = "ordersLineVariant")
    OrdersLineExtra toEntity(OrdersLineExtraDTO ordersLineExtraDTO);

    default OrdersLineExtra fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrdersLineExtra ordersLineExtra = new OrdersLineExtra();
        ordersLineExtra.setId(id);
        return ordersLineExtra;
    }
}
