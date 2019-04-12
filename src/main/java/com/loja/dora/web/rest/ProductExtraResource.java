package com.loja.dora.web.rest;

import com.loja.dora.service.ProductExtraQueryService;
import com.loja.dora.service.ProductExtraService;
import com.loja.dora.service.ProductService;
import com.loja.dora.service.ShopChangeService;
import com.loja.dora.service.dto.ProductDTO;
import com.loja.dora.service.dto.ProductExtraCriteria;
import com.loja.dora.service.dto.ProductExtraDTO;
import com.loja.dora.service.s3.S3Service;
import com.loja.dora.utils.CommonUtils;
import com.loja.dora.utils.Constants;
import com.loja.dora.web.rest.errors.BadRequestAlertException;
import com.loja.dora.web.rest.util.HeaderUtil;
import com.loja.dora.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProductExtra.
 */
@RestController
@RequestMapping("/api")
public class ProductExtraResource {

    private final Logger log = LoggerFactory.getLogger(ProductExtraResource.class);

    private static final String ENTITY_NAME = "productExtra";

    private final ProductExtraService productExtraService;

    private final ProductExtraQueryService productExtraQueryService;
    

    @Autowired
    ProductService productService;
   
    @Autowired
    ShopChangeService shopChangeService;
    
    @Autowired
    private S3Service s3Service;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;

    @Value("${amazonProperties.bucketName}")
    private String bucketName;

    public ProductExtraResource(ProductExtraService productExtraService, ProductExtraQueryService productExtraQueryService) {
        this.productExtraService = productExtraService;
        this.productExtraQueryService = productExtraQueryService;
    }

   
    /**
    * GET  /product-extras/count : count all the productExtras.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/product-extras/count")
    public ResponseEntity<Long> countProductExtras(ProductExtraCriteria criteria) {
        log.debug("REST request to count ProductExtras by criteria: {}", criteria);
        return ResponseEntity.ok().body(productExtraQueryService.countByCriteria(criteria));
    }

    /**
     * POST  /product-extras : Create a new productExtra.
     *
     * @param productExtraDTO the productExtraDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productExtraDTO, or with status 400 (Bad Request) if the productExtra has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-extras")
    public ResponseEntity<ProductExtraDTO> createProductExtra(@RequestBody ProductExtraDTO productExtraDTO) throws URISyntaxException {
        log.debug("REST request to save ProductExtra : {}", productExtraDTO);
        if (productExtraDTO.getId() != null) {
            throw new BadRequestAlertException("A new productExtra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductExtraDTO result = productExtraService.save(productExtraDTO);
        Optional <ProductDTO> productDTO = productService.findOne(productExtraDTO.getProductId());
        CommonUtils.saveShopChange(shopChangeService, productDTO.get().getShopId(), "ProductExtra", "New ProductExtra created", productDTO.get().getShopShopName()); 
       
        String fileName = "ProductExtra" + result.getId()  + ".png";
        String url = endpointUrl.concat("/").concat(bucketName).concat("/") + fileName;
        result.setFullPhotoUrl(url);
        byte[] imageBytes = CommonUtils.resize(CommonUtils.createImageFromBytes(productExtraDTO.getFullPhoto()),  Constants.FULL_IMAGE_HEIGHT,  Constants.FULL_IMAGE_WIDTH);

        CommonUtils.uploadToS3(imageBytes,fileName,s3Service.getAmazonS3() );
        ProductExtraDTO result2 = productExtraService.save(result);
        result2.setFullPhoto(null);
        result2.setFullPhotoContentType(null);
        
        String fileName2 = "ProductExtraThumb" + result.getId()  + ".png";
        String url2 = endpointUrl.concat("/").concat(bucketName).concat("/") + fileName2;
        result2.setThumbnailPhotoUrl(url2);
        byte[] imageBytes2 = CommonUtils.resize(CommonUtils.createImageFromBytes(productExtraDTO.getThumbnailPhoto()),  Constants.THUMBNAIL_HEIGHT,  Constants.THUMBNAIL_WIDTH);

        CommonUtils.uploadToS3(imageBytes2,fileName2,s3Service.getAmazonS3() );
        result2.setThumbnailPhoto(null);
        result2.setThumbnailPhotoContentType(null);
        
  
        productExtraService.save(result2);
        
        return ResponseEntity.created(new URI("/api/product-extras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-extras : Updates an existing productExtra.
     *
     * @param productExtraDTO the productExtraDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productExtraDTO,
     * or with status 400 (Bad Request) if the productExtraDTO is not valid,
     * or with status 500 (Internal Server Error) if the productExtraDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-extras")
    public ResponseEntity<ProductExtraDTO> updateProductExtra(@RequestBody ProductExtraDTO productExtraDTO) throws URISyntaxException {
        log.debug("REST request to update ProductExtra : {}", productExtraDTO);
        if (productExtraDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductExtraDTO result = productExtraService.save(productExtraDTO);
        Optional <ProductDTO> productDTO = productService.findOne(productExtraDTO.getProductId());
        CommonUtils.saveShopChange(shopChangeService, productDTO.get().getShopId(), "ProductExtra", "Existing ProductExtra updated", productDTO.get().getShopShopName()); 
       
        if (productExtraDTO.getFullPhoto() != null) {
        String fileName = "ProductExtra" + result.getId()  + ".png";
        String url = endpointUrl.concat("/").concat(bucketName).concat("/") + fileName;
        result.setFullPhotoUrl(url);
        byte[] imageBytes = CommonUtils.resize(CommonUtils.createImageFromBytes(productExtraDTO.getFullPhoto()),  Constants.FULL_IMAGE_HEIGHT,  Constants.FULL_IMAGE_WIDTH);
        CommonUtils.uploadToS3(imageBytes,fileName,s3Service.getAmazonS3() );
        result.setFullPhoto(null);
        result.setFullPhotoContentType(null);
        productExtraService.save(result);
        }
        
        if (productExtraDTO.getThumbnailPhoto() != null) {
        String fileName2 = "ProductExtraThumb" + result.getId()  + ".png";
        String url2 = endpointUrl.concat("/").concat(bucketName).concat("/") + fileName2;
        ProductExtraDTO result2 = productExtraService.save(result);
        result2.setThumbnailPhotoUrl(url2);
        byte[] imageBytes2 = CommonUtils.resize(CommonUtils.createImageFromBytes(productExtraDTO.getThumbnailPhoto()),  Constants.THUMBNAIL_HEIGHT,  Constants.THUMBNAIL_WIDTH);
        CommonUtils.uploadToS3(imageBytes2,fileName2,s3Service.getAmazonS3() );
        result2.setThumbnailPhoto(null);
        result2.setThumbnailPhotoContentType(null);
        productExtraService.save(result2);
        }
        
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productExtraDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-extras : get all the productExtras.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productExtras in body
     */
    @GetMapping("/product-extras")
    public ResponseEntity<List<ProductExtraDTO>> getAllProductExtras(Pageable pageable) {
        log.debug("REST request to get a page of ProductExtras");
        Pageable pageable2 =  PageRequest.of(pageable.getPageNumber(),2000);
        Page<ProductExtraDTO> page = productExtraService.findAll(pageable2);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/product-extras");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /product-extras/:id : get the "id" productExtra.
     *
     * @param id the id of the productExtraDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productExtraDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-extras/{id}")
    public ResponseEntity<ProductExtraDTO> getProductExtra(@PathVariable Long id) {
        log.debug("REST request to get ProductExtra : {}", id);
        Optional<ProductExtraDTO> productExtraDTO = productExtraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productExtraDTO);
    }

    /**
     * DELETE  /product-extras/:id : delete the "id" productExtra.
     *
     * @param id the id of the productExtraDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-extras/{id}")
    public ResponseEntity<Void> deleteProductExtra(@PathVariable Long id) {
        log.debug("REST request to delete ProductExtra : {}", id);
        Optional<ProductExtraDTO> productExtraDTO = productExtraService.findOne(id);
        Optional <ProductDTO> productDTO = productService.findOne(productExtraDTO.get().getProductId());
        long shopId = productDTO.get().getShopId();
        String shopName = productDTO.get().getShopShopName();
        productExtraService.delete(id);
        CommonUtils.saveShopChange(shopChangeService, shopId, "ProductExtra", "Existing ProductExtra deleted", shopName); 
        CommonUtils.deleteFromS3("ProductExtra" + id + ".png", s3Service.getAmazonS3());
        CommonUtils.deleteFromS3("ProductExtraThumb" + id + ".png", s3Service.getAmazonS3());

        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/product-extras?query=:query : search for the productExtra corresponding
     * to the query.
     *
     * @param query the query of the productExtra search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/product-extras")
    public ResponseEntity<List<ProductExtraDTO>> searchProductExtras(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ProductExtras for query {}", query);
        Page<ProductExtraDTO> page = productExtraService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/product-extras");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
