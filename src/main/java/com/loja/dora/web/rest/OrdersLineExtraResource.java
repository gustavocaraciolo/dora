package com.loja.dora.web.rest;
import com.loja.dora.service.OrdersLineExtraService;
import com.loja.dora.web.rest.errors.BadRequestAlertException;
import com.loja.dora.web.rest.util.HeaderUtil;
import com.loja.dora.web.rest.util.PaginationUtil;
import com.loja.dora.service.dto.OrdersLineExtraDTO;
import com.loja.dora.service.dto.OrdersLineExtraCriteria;
import com.loja.dora.service.OrdersLineExtraQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing OrdersLineExtra.
 */
@RestController
@RequestMapping("/api")
public class OrdersLineExtraResource {

    private final Logger log = LoggerFactory.getLogger(OrdersLineExtraResource.class);

    private static final String ENTITY_NAME = "ordersLineExtra";

    private final OrdersLineExtraService ordersLineExtraService;

    private final OrdersLineExtraQueryService ordersLineExtraQueryService;

    public OrdersLineExtraResource(OrdersLineExtraService ordersLineExtraService, OrdersLineExtraQueryService ordersLineExtraQueryService) {
        this.ordersLineExtraService = ordersLineExtraService;
        this.ordersLineExtraQueryService = ordersLineExtraQueryService;
    }

    /**
     * POST  /orders-line-extras : Create a new ordersLineExtra.
     *
     * @param ordersLineExtraDTO the ordersLineExtraDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ordersLineExtraDTO, or with status 400 (Bad Request) if the ordersLineExtra has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/orders-line-extras")
    public ResponseEntity<OrdersLineExtraDTO> createOrdersLineExtra(@Valid @RequestBody OrdersLineExtraDTO ordersLineExtraDTO) throws URISyntaxException {
        log.debug("REST request to save OrdersLineExtra : {}", ordersLineExtraDTO);
        if (ordersLineExtraDTO.getId() != null) {
            throw new BadRequestAlertException("A new ordersLineExtra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdersLineExtraDTO result = ordersLineExtraService.save(ordersLineExtraDTO);
        return ResponseEntity.created(new URI("/api/orders-line-extras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /orders-line-extras : Updates an existing ordersLineExtra.
     *
     * @param ordersLineExtraDTO the ordersLineExtraDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ordersLineExtraDTO,
     * or with status 400 (Bad Request) if the ordersLineExtraDTO is not valid,
     * or with status 500 (Internal Server Error) if the ordersLineExtraDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/orders-line-extras")
    public ResponseEntity<OrdersLineExtraDTO> updateOrdersLineExtra(@Valid @RequestBody OrdersLineExtraDTO ordersLineExtraDTO) throws URISyntaxException {
        log.debug("REST request to update OrdersLineExtra : {}", ordersLineExtraDTO);
        if (ordersLineExtraDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrdersLineExtraDTO result = ordersLineExtraService.save(ordersLineExtraDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ordersLineExtraDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /orders-line-extras : get all the ordersLineExtras.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of ordersLineExtras in body
     */
    @GetMapping("/orders-line-extras")
    public ResponseEntity<List<OrdersLineExtraDTO>> getAllOrdersLineExtras(OrdersLineExtraCriteria criteria, Pageable pageable) {
        log.debug("REST request to get OrdersLineExtras by criteria: {}", criteria);
        Page<OrdersLineExtraDTO> page = ordersLineExtraQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/orders-line-extras");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * GET  /orders-line-extras/count : count all the ordersLineExtras.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/orders-line-extras/count")
    public ResponseEntity<Long> countOrdersLineExtras(OrdersLineExtraCriteria criteria) {
        log.debug("REST request to count OrdersLineExtras by criteria: {}", criteria);
        return ResponseEntity.ok().body(ordersLineExtraQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /orders-line-extras/:id : get the "id" ordersLineExtra.
     *
     * @param id the id of the ordersLineExtraDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ordersLineExtraDTO, or with status 404 (Not Found)
     */
    @GetMapping("/orders-line-extras/{id}")
    public ResponseEntity<OrdersLineExtraDTO> getOrdersLineExtra(@PathVariable Long id) {
        log.debug("REST request to get OrdersLineExtra : {}", id);
        Optional<OrdersLineExtraDTO> ordersLineExtraDTO = ordersLineExtraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ordersLineExtraDTO);
    }

    /**
     * DELETE  /orders-line-extras/:id : delete the "id" ordersLineExtra.
     *
     * @param id the id of the ordersLineExtraDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/orders-line-extras/{id}")
    public ResponseEntity<Void> deleteOrdersLineExtra(@PathVariable Long id) {
        log.debug("REST request to delete OrdersLineExtra : {}", id);
        ordersLineExtraService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/orders-line-extras?query=:query : search for the ordersLineExtra corresponding
     * to the query.
     *
     * @param query the query of the ordersLineExtra search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/orders-line-extras")
    public ResponseEntity<List<OrdersLineExtraDTO>> searchOrdersLineExtras(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of OrdersLineExtras for query {}", query);
        Page<OrdersLineExtraDTO> page = ordersLineExtraService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/orders-line-extras");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
