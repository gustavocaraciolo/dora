package com.loja.dora.service;

import com.loja.dora.domain.ShopSection;
import com.loja.dora.repository.ShopSectionRepository;
import com.loja.dora.repository.search.ShopSectionSearchRepository;
import com.loja.dora.service.dto.ShopSectionDTO;
import com.loja.dora.service.mapper.ShopSectionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ShopSection.
 */
@Service
@Transactional
public class ShopSectionService {

    private final Logger log = LoggerFactory.getLogger(ShopSectionService.class);

    private final ShopSectionRepository shopSectionRepository;

    private final ShopSectionMapper shopSectionMapper;

    private final ShopSectionSearchRepository shopSectionSearchRepository;

    public ShopSectionService(ShopSectionRepository shopSectionRepository, ShopSectionMapper shopSectionMapper, ShopSectionSearchRepository shopSectionSearchRepository) {
        this.shopSectionRepository = shopSectionRepository;
        this.shopSectionMapper = shopSectionMapper;
        this.shopSectionSearchRepository = shopSectionSearchRepository;
    }

    /**
     * Save a shopSection.
     *
     * @param shopSectionDTO the entity to save
     * @return the persisted entity
     */
    public ShopSectionDTO save(ShopSectionDTO shopSectionDTO) {
        log.debug("Request to save ShopSection : {}", shopSectionDTO);
        ShopSection shopSection = shopSectionMapper.toEntity(shopSectionDTO);
        shopSection = shopSectionRepository.save(shopSection);
        ShopSectionDTO result = shopSectionMapper.toDto(shopSection);
        shopSectionSearchRepository.save(shopSection);
        return result;
    }

    /**
     * Get all the shopSections.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ShopSectionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ShopSections");
        return shopSectionRepository.findAll(pageable)
            .map(shopSectionMapper::toDto);
    }


    /**
     * Get one shopSection by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ShopSectionDTO> findOne(Long id) {
        log.debug("Request to get ShopSection : {}", id);
        return shopSectionRepository.findById(id)
            .map(shopSectionMapper::toDto);
    }

    /**
     * Delete the shopSection by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ShopSection : {}", id);
        shopSectionRepository.deleteById(id);
        shopSectionSearchRepository.deleteById(id);
    }

    /**
     * Search for the shopSection corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ShopSectionDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ShopSections for query {}", query);
        return shopSectionSearchRepository.search(queryStringQuery(query), pageable)
            .map(shopSectionMapper::toDto);
    }
}
