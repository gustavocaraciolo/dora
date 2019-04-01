package com.loja.dora.web.rest;

import com.loja.dora.service.OrdersQueryService;
import com.loja.dora.service.OrdersService;
import com.loja.dora.service.dto.OrdersCriteria;
import com.loja.dora.service.dto.OrdersDTO;
import com.loja.dora.service.dto.OrdersDTOFull;
import com.loja.dora.web.rest.errors.BadRequestAlertException;
import com.loja.dora.web.rest.util.HeaderUtil;
import com.loja.dora.web.rest.util.PaginationUtil;
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

/**
 * REST controller for managing Orders.
 */
@RestController
@RequestMapping("/api")
public class OrdersResource {

    private final Logger log = LoggerFactory.getLogger(OrdersResource.class);

    private static final String ENTITY_NAME = "orders";

    private final OrdersService ordersService;

    private final OrdersQueryService ordersQueryService;

    public OrdersResource(OrdersService ordersService, OrdersQueryService ordersQueryService) {
        this.ordersService = ordersService;
        this.ordersQueryService = ordersQueryService;
    }
    
    /**
     * POST  /orders : Create a new orders.
     *
     * @param ordersDTO the ordersDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ordersDTO, or with status 400 (Bad Request) if the orders has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/orders-full")
    public ResponseEntity<OrdersDTOFull> createOrdersFull(@Valid @RequestBody OrdersDTOFull ordersDTOFull) throws URISyntaxException {
        log.debug("REST request to save Orders : {}", ordersDTOFull);
        if (ordersDTOFull.getId() != null) {
            throw new BadRequestAlertException("A new orders cannot already have an ID", ENTITY_NAME, "idexists");
        }
        
        if(ordersDTOFull.getOrderDTO() == null) {
            throw new BadRequestAlertException("Missing OrdersDTO ", ENTITY_NAME, "missing_ordersDTO");

        }
        
        if(ordersDTOFull.getOrdersLineDTOFullList() == null || ordersDTOFull.getOrdersLineDTOFullList().size() < 1) {
            throw new BadRequestAlertException("Missing OrdersLineDTO ", ENTITY_NAME, "missing_ordersline");

        }
        
        if(ordersDTOFull.getOrdersLineDTOFullList().get(0).getOrdersLineVariantsDTOFullList() == null || ordersDTOFull.getOrdersLineDTOFullList().get(0).getOrdersLineVariantsDTOFullList().size() < 1) {
            throw new BadRequestAlertException("Missing OrdersLineVariantDTO ", ENTITY_NAME, "missing_orderslinevariant");

        }
        
        
        
        OrdersDTOFull result = ordersService.saveOdersDTOFull(ordersDTOFull);
        return ResponseEntity.created(new URI("/api/orders-full/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    @GetMapping("/orders-full/{shopId}/{orderStatus}")
    public ResponseEntity<List<OrdersDTOFull>> getAllOrders(Pageable pageable, @PathVariable Long shopId, @PathVariable String orderStatus ) {
        log.debug("REST request to get a page of Orders");
        List<OrdersDTOFull> list = ordersService.findAllOrdersFull(pageable,shopId,orderStatus);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }



    /**
     * POST  /orders : Create a new orders.
     *
     * @param ordersDTO the ordersDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ordersDTO, or with status 400 (Bad Request) if the orders has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/orders")
    public ResponseEntity<OrdersDTO> createOrders(@Valid @RequestBody OrdersDTO ordersDTO) throws URISyntaxException {
        log.debug("REST request to save Orders : {}", ordersDTO);
        if (ordersDTO.getId() != null) {
            throw new BadRequestAlertException("A new orders cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdersDTO result = ordersService.save(ordersDTO);
        return ResponseEntity.created(new URI("/api/orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /orders : Updates an existing orders.
     *
     * @param ordersDTO the ordersDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ordersDTO,
     * or with status 400 (Bad Request) if the ordersDTO is not valid,
     * or with status 500 (Internal Server Error) if the ordersDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/orders")
    public ResponseEntity<OrdersDTO> updateOrders(@Valid @RequestBody OrdersDTO ordersDTO) throws URISyntaxException {
        log.debug("REST request to update Orders : {}", ordersDTO);
        if (ordersDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrdersDTO result = ordersService.save(ordersDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ordersDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /orders : get all the orders.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of orders in body
     */
    @GetMapping("/orders")
    public ResponseEntity<List<OrdersDTO>> getAllOrders(OrdersCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Orders by criteria: {}", criteria);
        Page<OrdersDTO> page = ordersQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/orders");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * GET  /orders/count : count all the orders.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/orders/count")
    public ResponseEntity<Long> countOrders(OrdersCriteria criteria) {
        log.debug("REST request to count Orders by criteria: {}", criteria);
        return ResponseEntity.ok().body(ordersQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /orders/:id : get the "id" orders.
     *
     * @param id the id of the ordersDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ordersDTO, or with status 404 (Not Found)
     */
    @GetMapping("/orders/{id}")
    public ResponseEntity<OrdersDTO> getOrders(@PathVariable Long id) {
        log.debug("REST request to get Orders : {}", id);
        Optional<OrdersDTO> ordersDTO = ordersService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ordersDTO);
    }

    /**
     * DELETE  /orders/:id : delete the "id" orders.
     *
     * @param id the id of the ordersDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<Void> deleteOrders(@PathVariable Long id) {
        log.debug("REST request to delete Orders : {}", id);
        ordersService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/orders?query=:query : search for the orders corresponding
     * to the query.
     *
     * @param query the query of the orders search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/orders")
    public ResponseEntity<List<OrdersDTO>> searchOrders(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Orders for query {}", query);
        Page<OrdersDTO> page = ordersService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/orders");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
