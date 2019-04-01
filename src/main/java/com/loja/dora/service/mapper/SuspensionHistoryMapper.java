package com.loja.dora.service.mapper;

import com.loja.dora.domain.*;
import com.loja.dora.service.dto.SuspensionHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SuspensionHistory and its DTO SuspensionHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {ProfileMapper.class})
public interface SuspensionHistoryMapper extends EntityMapper<SuspensionHistoryDTO, SuspensionHistory> {

    @Mapping(source = "profile.id", target = "profileId")
    @Mapping(source = "profile.firstName", target = "profileFirstName")
    @Mapping(source = "suspendedBy.id", target = "suspendedById")
    @Mapping(source = "suspendedBy.firstName", target = "suspendedByFirstName")
    SuspensionHistoryDTO toDto(SuspensionHistory suspensionHistory);

    @Mapping(source = "profileId", target = "profile")
    @Mapping(source = "suspendedById", target = "suspendedBy")
    SuspensionHistory toEntity(SuspensionHistoryDTO suspensionHistoryDTO);

    default SuspensionHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        SuspensionHistory suspensionHistory = new SuspensionHistory();
        suspensionHistory.setId(id);
        return suspensionHistory;
    }
}
