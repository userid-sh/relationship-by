package relationshipby.service.mapper;

import static relationshipby.domain.DomainPropertyAsserts.*;
import static relationshipby.domain.DomainPropertyTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DomainPropertyMapperTest {

    private DomainPropertyMapper domainPropertyMapper;

    @BeforeEach
    void setUp() {
        domainPropertyMapper = new DomainPropertyMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDomainPropertySample1();
        var actual = domainPropertyMapper.toEntity(domainPropertyMapper.toDto(expected));
        assertDomainPropertyAllPropertiesEquals(expected, actual);
    }
}
