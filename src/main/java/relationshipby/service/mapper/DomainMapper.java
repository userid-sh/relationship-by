package relationshipby.service.mapper;

import org.mapstruct.*;
import relationshipby.domain.Domain;
import relationshipby.service.dto.DomainDTO;

/**
 * Mapper for the entity {@link Domain} and its DTO {@link DomainDTO}.
 */
@Mapper(componentModel = "spring")
public interface DomainMapper extends EntityMapper<DomainDTO, Domain> {}
