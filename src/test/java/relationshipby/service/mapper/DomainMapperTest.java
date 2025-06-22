package relationshipby.service.mapper;

import static relationshipby.domain.DomainAsserts.*;
import static relationshipby.domain.DomainTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DomainMapperTest {

    private DomainMapper domainMapper;

    @BeforeEach
    void setUp() {
        domainMapper = new DomainMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDomainSample1();
        var actual = domainMapper.toEntity(domainMapper.toDto(expected));
        assertDomainAllPropertiesEquals(expected, actual);
    }
}
