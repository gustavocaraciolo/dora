package com.loja.dora.web.rest;
import com.loja.dora.service.PaymentMethodConfigService;
import com.loja.dora.web.rest.errors.BadRequestAlertException;
import com.loja.dora.web.rest.util.HeaderUtil;
import com.loja.dora.web.rest.util.PaginationUtil;
import com.loja.dora.service.dto.PaymentMethodConfigDTO;
import com.loja.dora.service.dto.PaymentMethodConfigCriteria;
import com.loja.dora.service.PaymentMethodConfigQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing PaymentMethodConfig.
 */
@RestController
@RequestMapping("/api")
public class PaymentMethodConfigResource {

    private final Logger log = LoggerFactory.getLogger(PaymentMethodConfigResource.class);

    private static final String ENTITY_NAME = "paymentMethodConfig";

    private final PaymentMethodConfigService paymentMethodConfigService;

    private final PaymentMethodConfigQueryService paymentMethodConfigQueryService;

    public PaymentMethodConfigResource(PaymentMethodConfigService paymentMethodConfigService, PaymentMethodConfigQueryService paymentMethodConfigQueryService) {
        this.paymentMethodConfigService = paymentMethodConfigService;
        this.paymentMethodConfigQueryService = paymentMethodConfigQueryService;
    }

    /**
     * POST  /payment-method-configs : Create a new paymentMethodConfig.
     *
     * @param paymentMethodConfigDTO the paymentMethodConfigDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new paymentMethodConfigDTO, or with status 400 (Bad Request) if the paymentMethodConfig has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/payment-method-configs")
    public ResponseEntity<PaymentMethodConfigDTO> createPaymentMethodConfig(@RequestBody PaymentMethodConfigDTO paymentMethodConfigDTO) throws URISyntaxException {
        log.debug("REST request to save PaymentMethodConfig : {}", paymentMethodConfigDTO);
        if (paymentMethodConfigDTO.getId() != null) {
            throw new BadRequestAlertException("A new paymentMethodConfig cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentMethodConfigDTO result = paymentMethodConfigService.save(paymentMethodConfigDTO);
        return ResponseEntity.created(new URI("/api/payment-method-configs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /payment-method-configs : Updates an existing paymentMethodConfig.
     *
     * @param paymentMethodConfigDTO the paymentMethodConfigDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated paymentMethodConfigDTO,
     * or with status 400 (Bad Request) if the paymentMethodConfigDTO is not valid,
     * or with status 500 (Internal Server Error) if the paymentMethodConfigDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/payment-method-configs")
    public ResponseEntity<PaymentMethodConfigDTO> updatePaymentMethodConfig(@RequestBody PaymentMethodConfigDTO paymentMethodConfigDTO) throws URISyntaxException {
        log.debug("REST request to update PaymentMethodConfig : {}", paymentMethodConfigDTO);
        if (paymentMethodConfigDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PaymentMethodConfigDTO result = paymentMethodConfigService.save(paymentMethodConfigDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, paymentMethodConfigDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /payment-method-configs : get all the paymentMethodConfigs.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of paymentMethodConfigs in body
     */
    @GetMapping("/payment-method-configs")
    public ResponseEntity<List<PaymentMethodConfigDTO>> getAllPaymentMethodConfigs(PaymentMethodConfigCriteria criteria, Pageable pageable) {
        log.debug("REST request to get PaymentMethodConfigs by criteria: {}", criteria);
        Page<PaymentMethodConfigDTO> page = paymentMethodConfigQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/payment-method-configs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * GET  /payment-method-configs/count : count all the paymentMethodConfigs.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/payment-method-configs/count")
    public ResponseEntity<Long> countPaymentMethodConfigs(PaymentMethodConfigCriteria criteria) {
        log.debug("REST request to count PaymentMethodConfigs by criteria: {}", criteria);
        return ResponseEntity.ok().body(paymentMethodConfigQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /payment-method-configs/:id : get the "id" paymentMethodConfig.
     *
     * @param id the id of the paymentMethodConfigDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the paymentMethodConfigDTO, or with status 404 (Not Found)
     */
    @GetMapping("/payment-method-configs/{id}")
    public ResponseEntity<PaymentMethodConfigDTO> getPaymentMethodConfig(@PathVariable Long id) {
        log.debug("REST request to get PaymentMethodConfig : {}", id);
        Optional<PaymentMethodConfigDTO> paymentMethodConfigDTO = paymentMethodConfigService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paymentMethodConfigDTO);
    }

    /**
     * DELETE  /payment-method-configs/:id : delete the "id" paymentMethodConfig.
     *
     * @param id the id of the paymentMethodConfigDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/payment-method-configs/{id}")
    public ResponseEntity<Void> deletePaymentMethodConfig(@PathVariable Long id) {
        log.debug("REST request to delete PaymentMethodConfig : {}", id);
        paymentMethodConfigService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/payment-method-configs?query=:query : search for the paymentMethodConfig corresponding
     * to the query.
     *
     * @param query the query of the paymentMethodConfig search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/payment-method-configs")
    public ResponseEntity<List<PaymentMethodConfigDTO>> searchPaymentMethodConfigs(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of PaymentMethodConfigs for query {}", query);
        Page<PaymentMethodConfigDTO> page = paymentMethodConfigService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/payment-method-configs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
