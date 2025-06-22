package relationshipby.service.mapper;

import org.mapstruct.*;
import relationshipby.domain.Domain;
import relationshipby.domain.DomainProperty;
import relationshipby.service.dto.DomainDTO;
import relationshipby.service.dto.DomainPropertyDTO;

/**
 * Mapper for the entity {@link DomainProperty} and its DTO {@link DomainPropertyDTO}.
 */
@Mapper(componentModel = "spring")
public interface DomainPropertyMapper extends EntityMapper<DomainPropertyDTO, DomainProperty> {
    @Mapping(target = "domain", source = "domain", qualifiedByName = "domainId")
    DomainPropertyDTO toDto(DomainProperty s);

    @Named("domainId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DomainDTO toDtoDomainId(Domain domain);
}
