package com.loja.dora.service.mapper;

import com.loja.dora.domain.*;
import com.loja.dora.service.dto.PaymentMethodConfigDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PaymentMethodConfig and its DTO PaymentMethodConfigDTO.
 */
@Mapper(componentModel = "spring", uses = {PaymentMethodMapper.class})
public interface PaymentMethodConfigMapper extends EntityMapper<PaymentMethodConfigDTO, PaymentMethodConfig> {

    @Mapping(source = "paymentMethod.id", target = "paymentMethodId")
    @Mapping(source = "paymentMethod.paymentMethod", target = "paymentMethodPaymentMethod")
    PaymentMethodConfigDTO toDto(PaymentMethodConfig paymentMethodConfig);

    @Mapping(source = "paymentMethodId", target = "paymentMethod")
    PaymentMethodConfig toEntity(PaymentMethodConfigDTO paymentMethodConfigDTO);

    default PaymentMethodConfig fromId(Long id) {
        if (id == null) {
            return null;
        }
        PaymentMethodConfig paymentMethodConfig = new PaymentMethodConfig();
        paymentMethodConfig.setId(id);
        return paymentMethodConfig;
    }
}
