package com.loja.dora.web.rest;

import com.loja.dora.domain.User;
import com.loja.dora.domain.enumeration.ProfileStatus;
import com.loja.dora.repository.UserRepository;
import com.loja.dora.security.AuthoritiesConstants;
import com.loja.dora.security.SecurityUtils;
import com.loja.dora.service.ProfileQueryService;
import com.loja.dora.service.ProfileService;
import com.loja.dora.service.ShopChangeService;
import com.loja.dora.service.UserService;
import com.loja.dora.service.dto.ProfileCriteria;
import com.loja.dora.service.dto.ProfileDTO;
import com.loja.dora.service.dto.ProfileDTOFull;
import com.loja.dora.service.mapper.UserMapper;
import com.loja.dora.service.s3.S3Service;
import com.loja.dora.utils.CommonUtils;
import com.loja.dora.utils.Constants;
import com.loja.dora.web.rest.errors.BadRequestAlertException;
import com.loja.dora.web.rest.util.HeaderUtil;
import com.loja.dora.web.rest.util.PaginationUtil;
import com.loja.dora.web.rest.vm.ManagedUserVM;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Profile.
 */
@RestController
@RequestMapping("/api")
public class ProfileResource {

    private final Logger log = LoggerFactory.getLogger(ProfileResource.class);

    private static final String ENTITY_NAME = "profile";

    private final ProfileService profileService;

    private final ProfileQueryService profileQueryService;
    
    @Autowired
    RestTemplate restTemplate;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    ShopChangeService shopChangeService;
    
    @Autowired
    S3Service s3Service;
    
    @Value("${application.auth-server.register-url}")
    String registerUrl;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;

    @Value("${amazonProperties.bucketName}")
    private String bucketName;

    @Autowired
    UserService userService;
    
    @Autowired
    UserMapper userMapper;

    public ProfileResource(ProfileService profileService, ProfileQueryService profileQueryService) {
        this.profileService = profileService;
        this.profileQueryService = profileQueryService;
    }

    /**
     * POST  /profiles : Create a new profile.
     *
     * @param profileDTO the profileDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new profileDTO, or with status 400 (Bad Request) if the profile has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/profiles")
    public ResponseEntity<ProfileDTO> createProfile(@RequestHeader HttpHeaders httpHeaders, @Valid @RequestBody ProfileDTO profileDTO) throws URISyntaxException {
        log.debug("REST request to save Profile : {}", profileDTO);

        ManagedUserVM managedUserVM = new  ManagedUserVM();
        managedUserVM.setActivated(false);
        managedUserVM.setEmail(profileDTO.getEmail());
        managedUserVM.setFirstName(profileDTO.getFirstName());
        managedUserVM.setLastName(profileDTO.getLastName());
        managedUserVM.setLangKey("en");
        managedUserVM.setLogin(profileDTO.getEmail());
        managedUserVM.setPassword("defaultpassword");
        managedUserVM.setCreatedBy(SecurityUtils.getCurrentUserLogin().get());
        managedUserVM.setCreatedDate(ZonedDateTime.now().toInstant());
        HttpEntity<ManagedUserVM> entity = new HttpEntity<ManagedUserVM>(managedUserVM,httpHeaders);

        log.debug("REST request to save registerUrl : {}", registerUrl);
        ResponseEntity<Void> response =restTemplate.exchange(registerUrl, HttpMethod.POST, entity, Void.class);
        Void body = null;
        
        if (response.getStatusCode().is2xxSuccessful()) {
        	body = response.getBody();
        } else {
            throw new BadRequestAlertException("Normal User Could not be created", ENTITY_NAME, "idexists");

        }
        
        if (profileDTO.getId() != null) {
            throw new BadRequestAlertException("A new profile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        
        User user = userRepository.findOneByEmailIgnoreCase(profileDTO.getEmail()).get();
        
        profileDTO.setUserId(user.getId());
        profileDTO.setActive(true);
        profileDTO.setLastAccess(ZonedDateTime.now());
        profileDTO.setProfileStatus(ProfileStatus.ACTIVE);
        profileDTO.setRegisterationDate(ZonedDateTime.now());
           
        ProfileDTO result = profileService.save(profileDTO);
        CommonUtils.saveShopChange(shopChangeService, profileDTO.getShopId(), "Profile", "New Profile created", profileDTO.getShopShopName()); 
        
        String fileName = "Profile" + result.getId()  + ".png";
        String url = endpointUrl.concat("/").concat(bucketName).concat("/") + fileName;
        result.setFullPhotoUrl(url);
        byte[] imageBytes = CommonUtils.resize(CommonUtils.createImageFromBytes(profileDTO.getFullPhoto()),  Constants.FULL_IMAGE_HEIGHT,  Constants.FULL_IMAGE_WIDTH);
        CommonUtils.uploadToS3(imageBytes,fileName,s3Service.getAmazonS3() );
        ProfileDTO result2 = profileService.save(result);
        result2.setFullPhoto(null);
        result2.setFullPhotoContentType(null);
        
        String fileName2 = "ProfileThumb" + result.getId()  + ".png";
        String url2 = endpointUrl.concat("/").concat(bucketName).concat("/") + fileName2;
        result2.setThumbnailPhotoUrl(url2);
        byte[] imageBytes2 = CommonUtils.resize(CommonUtils.createImageFromBytes(profileDTO.getThumbnailPhoto()),  Constants.THUMBNAIL_HEIGHT,  Constants.THUMBNAIL_WIDTH);
        CommonUtils.uploadToS3(imageBytes2,fileName2,s3Service.getAmazonS3() );
        result2.setThumbnailPhoto(null);
        result2.setThumbnailPhotoContentType(null);
        
        profileService.save(result2);
        return ResponseEntity.created(new URI("/api/profiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    

    /**
     * PUT  /profiles : Updates an existing profile.
     *
     * @param profileDTO the profileDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated profileDTO,
     * or with status 400 (Bad Request) if the profileDTO is not valid,
     * or with status 500 (Internal Server Error) if the profileDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/profiles")
    public ResponseEntity<ProfileDTO> updateProfile(@Valid @RequestBody ProfileDTO profileDTO) throws URISyntaxException {
        log.debug("REST request to update Profile : {}", profileDTO);
        if (profileDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfileDTO result = profileService.save(profileDTO);
        
        /* -START-
        * ADD DEFAULT VALUES TO THE FIELDS BELOW
        */
        profileDTO.setActive(true);
        profileDTO.setRegisterationDate(ZonedDateTime.now());
        profileDTO.setLastAccess(ZonedDateTime.now());
        /* -END- */
        CommonUtils.saveShopChange(shopChangeService, profileDTO.getShopId(), "Profile", "Existing Profile updated", profileDTO.getShopShopName()); 
      
        if (profileDTO.getFullPhoto() != null) {
        String fileName = "Profile" + result.getId()  + ".png";
        String url = endpointUrl.concat("/").concat(bucketName).concat("/") + fileName;
        result.setFullPhotoUrl(url);
        byte[] imageBytes = CommonUtils.resize(CommonUtils.createImageFromBytes(profileDTO.getFullPhoto()),  Constants.FULL_IMAGE_HEIGHT,  Constants.FULL_IMAGE_WIDTH);
        CommonUtils.uploadToS3(imageBytes,fileName,s3Service.getAmazonS3() );
        result.setFullPhoto(null);
        result.setFullPhotoContentType(null);
        profileService.save(result);

        }
        
        if (profileDTO.getThumbnailPhoto() != null) {

        String fileName2 = "ProfileThumb" + result.getId()  + ".png";
        String url2 = endpointUrl.concat("/").concat(bucketName).concat("/") + fileName2;
        ProfileDTO result2 = profileService.save(result);
        result2.setThumbnailPhotoUrl(url2);
        byte[] imageBytes2 = CommonUtils.resize(CommonUtils.createImageFromBytes(profileDTO.getThumbnailPhoto()),  Constants.THUMBNAIL_HEIGHT,  Constants.THUMBNAIL_WIDTH);
        CommonUtils.uploadToS3(imageBytes2,fileName2,s3Service.getAmazonS3() );
        result2.setThumbnailPhoto(null);
        result2.setThumbnailPhotoContentType(null);
        profileService.save(result2);
        }
        
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, profileDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /profiles : get all the profiles.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of profiles in body
     */
    @GetMapping("/profiles")
    public ResponseEntity<List<ProfileDTO>> getAllProfiles(ProfileCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Profiles by criteria: {}", criteria);
        Page<ProfileDTO> page = profileQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/profiles");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * GET  /profiles/count : count all the profiles.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/profiles/count")
    public ResponseEntity<Long> countProfiles(ProfileCriteria criteria) {
        log.debug("REST request to count Profiles by criteria: {}", criteria);
        return ResponseEntity.ok().body(profileQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /profiles/:id : get the "id" profile.
     *
     * @param id the id of the profileDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the profileDTO, or with status 404 (Not Found)
     */
    @GetMapping("/profiles/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Long id) {
        log.debug("REST request to get Profile : {}", id);
        Optional<ProfileDTO> profileDTO = profileService.findOne(id);
        return ResponseUtil.wrapOrNotFound(profileDTO);
    }

    /**
     * GET  /profiles/:id : get the "id" profile with Full details such as shops, company and user.
     *
     * @param id the id of the profileDTOFull to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the profileDTO, or with status 404 (Not Found)
     */
    @GetMapping("/profile-full-by-email/{email}")
    public ResponseEntity<ProfileDTOFull> getProfileFull(@PathVariable String email) {
        log.debug("REST request to get FULL Profile by email  : {}", email);
        ProfileDTOFull profileDTOFull = profileService.findByEmail(email);
        return new ResponseEntity<>(profileDTOFull, HttpStatus.OK);
    }

    /**
     * DELETE  /profiles/:id : delete the "id" profile.
     *
     * @param id the id of the profileDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/profiles/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        log.debug("REST request to delete Profile : {}", id);
        Optional<ProfileDTO> profileDTO = profileService.findOne(id);
        long shopId = profileDTO.get().getShopId();
        String shopName = profileDTO.get().getShopShopName();
        Optional<User>  user = userRepository.findOneByEmailIgnoreCase(profileDTO.get().getEmail());
        profileService.delete(id);
        CommonUtils.saveShopChange(shopChangeService, shopId, "Profile", "Existing Profile deleted", shopName); 
        CommonUtils.deleteFromS3("Profile" + id + ".png", s3Service.getAmazonS3());
        CommonUtils.deleteFromS3("ProfileThumb" + id + ".png", s3Service.getAmazonS3());   
        if (user.isPresent()) {
        	log.debug("Account ("+id+") deletion");
        	
        	user.get().setActivated(false);
        	user.get().setCreatedDate(Instant.now().minus(com.loja.dora.utils.Constants.MAX_DAYS_USER_REMOVED, ChronoUnit.DAYS));
        	userService.updateUser(userMapper.userToUserDTO(user.get()));
        	userService.removeNotActivatedUsers();
        }
        
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/profiles?query=:query : search for the profile corresponding
     * to the query.
     *
     * @param query the query of the profile search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/profiles")
    public ResponseEntity<List<ProfileDTO>> searchProfiles(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Profiles for query {}", query);
        Page<ProfileDTO> page = profileService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/profiles");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    
    

}
