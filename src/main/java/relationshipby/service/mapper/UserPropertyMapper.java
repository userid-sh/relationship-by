package relationshipby.service.mapper;

import org.mapstruct.*;
import relationshipby.domain.AppUser;
import relationshipby.domain.DomainProperty;
import relationshipby.domain.UserProperty;
import relationshipby.service.dto.AppUserDTO;
import relationshipby.service.dto.DomainPropertyDTO;
import relationshipby.service.dto.UserPropertyDTO;

/**
 * Mapper for the entity {@link UserProperty} and its DTO {@link UserPropertyDTO}.
 */
@Mapper(componentModel = "spring")
public interface UserPropertyMapper extends EntityMapper<UserPropertyDTO, UserProperty> {
    @Mapping(target = "user", source = "user", qualifiedByName = "appUserId")
    @Mapping(target = "domainProperty", source = "domainProperty", qualifiedByName = "domainPropertyId")
    UserPropertyDTO toDto(UserProperty s);

    @Named("appUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppUserDTO toDtoAppUserId(AppUser appUser);

    @Named("domainPropertyId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DomainPropertyDTO toDtoDomainPropertyId(DomainProperty domainProperty);
}
