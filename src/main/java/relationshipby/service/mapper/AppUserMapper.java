package relationshipby.service.mapper;

import org.mapstruct.*;
import relationshipby.domain.AppUser;
import relationshipby.domain.Domain;
import relationshipby.service.dto.AppUserDTO;
import relationshipby.service.dto.DomainDTO;

/**
 * Mapper for the entity {@link AppUser} and its DTO {@link AppUserDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppUserMapper extends EntityMapper<AppUserDTO, AppUser> {
    @Mapping(target = "domain", source = "domain", qualifiedByName = "domainId")
    AppUserDTO toDto(AppUser s);

    @Named("domainId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DomainDTO toDtoDomainId(Domain domain);
}
