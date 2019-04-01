package com.loja.dora.service.mapper;

import com.loja.dora.domain.*;
import com.loja.dora.service.dto.EmailBalancerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EmailBalancer and its DTO EmailBalancerDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EmailBalancerMapper extends EntityMapper<EmailBalancerDTO, EmailBalancer> {



    default EmailBalancer fromId(Long id) {
        if (id == null) {
            return null;
        }
        EmailBalancer emailBalancer = new EmailBalancer();
        emailBalancer.setId(id);
        return emailBalancer;
    }
}
