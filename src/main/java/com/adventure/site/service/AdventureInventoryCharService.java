package com.adventure.site.service;

import com.adventure.site.service.dto.AdventureInventoryCharDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.adventure.site.domain.AdventureInventoryChar}.
 */
public interface AdventureInventoryCharService {

    /**
     * Save a adventureInventoryChar.
     *
     * @param adventureInventoryCharDTO the entity to save.
     * @return the persisted entity.
     */
    AdventureInventoryCharDTO save(AdventureInventoryCharDTO adventureInventoryCharDTO);

    /**
     * Get all the adventureInventoryChars.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AdventureInventoryCharDTO> findAll(Pageable pageable);


    /**
     * Get the "id" adventureInventoryChar.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AdventureInventoryCharDTO> findOne(String id);

    /**
     * Delete the "id" adventureInventoryChar.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    /**
     * Search for the adventureInventoryChar corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AdventureInventoryCharDTO> search(String query, Pageable pageable);
}
