package com.loja.dora.service;

import com.loja.dora.domain.Tax;
import com.loja.dora.repository.TaxRepository;
import com.loja.dora.repository.search.TaxSearchRepository;
import com.loja.dora.service.dto.TaxDTO;
import com.loja.dora.service.mapper.TaxMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Tax.
 */
@Service
@Transactional
public class TaxService {

    private final Logger log = LoggerFactory.getLogger(TaxService.class);

    private final TaxRepository taxRepository;

    private final TaxMapper taxMapper;

    private final TaxSearchRepository taxSearchRepository;

    public TaxService(TaxRepository taxRepository, TaxMapper taxMapper, TaxSearchRepository taxSearchRepository) {
        this.taxRepository = taxRepository;
        this.taxMapper = taxMapper;
        this.taxSearchRepository = taxSearchRepository;
    }

    /**
     * Save a tax.
     *
     * @param taxDTO the entity to save
     * @return the persisted entity
     */
    public TaxDTO save(TaxDTO taxDTO) {
        log.debug("Request to save Tax : {}", taxDTO);
        Tax tax = taxMapper.toEntity(taxDTO);
        tax = taxRepository.save(tax);
        TaxDTO result = taxMapper.toDto(tax);
        taxSearchRepository.save(tax);
        return result;
    }

    /**
     * Get all the taxes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TaxDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Taxes");
        return taxRepository.findAll(pageable)
            .map(taxMapper::toDto);
    }


    /**
     * Get one tax by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TaxDTO> findOne(Long id) {
        log.debug("Request to get Tax : {}", id);
        return taxRepository.findById(id)
            .map(taxMapper::toDto);
    }

    /**
     * Delete the tax by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Tax : {}", id);
        taxRepository.deleteById(id);
        taxSearchRepository.deleteById(id);
    }

    /**
     * Search for the tax corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TaxDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Taxes for query {}", query);
        return taxSearchRepository.search(queryStringQuery(query), pageable)
            .map(taxMapper::toDto);
    }
}
