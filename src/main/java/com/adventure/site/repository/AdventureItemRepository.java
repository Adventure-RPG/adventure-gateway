package com.adventure.site.repository;

import com.adventure.site.domain.AdventureItem;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AdventureItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdventureItemRepository extends MongoRepository<AdventureItem, String> {

}
