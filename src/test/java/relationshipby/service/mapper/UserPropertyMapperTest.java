package relationshipby.service.mapper;

import static relationshipby.domain.UserPropertyAsserts.*;
import static relationshipby.domain.UserPropertyTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UserPropertyMapperTest {

    private UserPropertyMapper userPropertyMapper;

    @BeforeEach
    void setUp() {
        userPropertyMapper = new UserPropertyMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getUserPropertySample1();
        var actual = userPropertyMapper.toEntity(userPropertyMapper.toDto(expected));
        assertUserPropertyAllPropertiesEquals(expected, actual);
    }
}
