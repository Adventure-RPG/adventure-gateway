package com.adventure.site.service.mapper;

import com.adventure.site.domain.*;
import com.adventure.site.service.dto.AdventureScriptDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link AdventureScript} and its DTO {@link AdventureScriptDTO}.
 */
@Mapper(componentModel = "spring", uses = {AdventureSkillMapper.class})
public interface AdventureScriptMapper extends EntityMapper<AdventureScriptDTO, AdventureScript> {

    @Mapping(source = "adventureSkill.id", target = "adventureSkillId")
    AdventureScriptDTO toDto(AdventureScript adventureScript);

    @Mapping(source = "adventureSkillId", target = "adventureSkill")
    AdventureScript toEntity(AdventureScriptDTO adventureScriptDTO);

    default AdventureScript fromId(String id) {
        if (id == null) {
            return null;
        }
        AdventureScript adventureScript = new AdventureScript();
        adventureScript.setId(id);
        return adventureScript;
    }
}
