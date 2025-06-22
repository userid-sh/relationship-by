package relationshipby.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static relationshipby.domain.AppUserTestSamples.*;
import static relationshipby.domain.DomainPropertyTestSamples.*;
import static relationshipby.domain.UserPropertyTestSamples.*;

import org.junit.jupiter.api.Test;
import relationshipby.web.rest.TestUtil;

class UserPropertyTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProperty.class);
        UserProperty userProperty1 = getUserPropertySample1();
        UserProperty userProperty2 = new UserProperty();
        assertThat(userProperty1).isNotEqualTo(userProperty2);

        userProperty2.setId(userProperty1.getId());
        assertThat(userProperty1).isEqualTo(userProperty2);

        userProperty2 = getUserPropertySample2();
        assertThat(userProperty1).isNotEqualTo(userProperty2);
    }

    @Test
    void userTest() {
        UserProperty userProperty = getUserPropertyRandomSampleGenerator();
        AppUser appUserBack = getAppUserRandomSampleGenerator();

        userProperty.setUser(appUserBack);
        assertThat(userProperty.getUser()).isEqualTo(appUserBack);

        userProperty.user(null);
        assertThat(userProperty.getUser()).isNull();
    }

    @Test
    void domainPropertyTest() {
        UserProperty userProperty = getUserPropertyRandomSampleGenerator();
        DomainProperty domainPropertyBack = getDomainPropertyRandomSampleGenerator();

        userProperty.setDomainProperty(domainPropertyBack);
        assertThat(userProperty.getDomainProperty()).isEqualTo(domainPropertyBack);

        userProperty.domainProperty(null);
        assertThat(userProperty.getDomainProperty()).isNull();
    }
}
