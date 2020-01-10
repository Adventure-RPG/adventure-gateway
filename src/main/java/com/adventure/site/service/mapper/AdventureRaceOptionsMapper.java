package com.adventure.site.service.mapper;

import com.adventure.site.domain.*;
import com.adventure.site.service.dto.AdventureRaceOptionsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link AdventureRaceOptions} and its DTO {@link AdventureRaceOptionsDTO}.
 */
@Mapper(componentModel = "spring", uses = {AdventureModelMapper.class, AdventureRaceMapper.class})
public interface AdventureRaceOptionsMapper extends EntityMapper<AdventureRaceOptionsDTO, AdventureRaceOptions> {

    @Mapping(source = "adventureRace.id", target = "adventureRaceId")
    AdventureRaceOptionsDTO toDto(AdventureRaceOptions adventureRaceOptions);

    @Mapping(target = "adventureModelOptions", ignore = true)
    @Mapping(target = "removeAdventureModelOptions", ignore = true)
    @Mapping(target = "removeAdventureModel", ignore = true)
    @Mapping(source = "adventureRaceId", target = "adventureRace")
    AdventureRaceOptions toEntity(AdventureRaceOptionsDTO adventureRaceOptionsDTO);

    default AdventureRaceOptions fromId(String id) {
        if (id == null) {
            return null;
        }
        AdventureRaceOptions adventureRaceOptions = new AdventureRaceOptions();
        adventureRaceOptions.setId(id);
        return adventureRaceOptions;
    }
}
