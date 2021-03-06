package com.adventure.site.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link AdventureSkillSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class AdventureSkillSearchRepositoryMockConfiguration {

    @MockBean
    private AdventureSkillSearchRepository mockAdventureSkillSearchRepository;

}
