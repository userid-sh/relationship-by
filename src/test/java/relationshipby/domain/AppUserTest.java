package relationshipby.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static relationshipby.domain.AppUserTestSamples.*;
import static relationshipby.domain.DomainTestSamples.*;

import org.junit.jupiter.api.Test;
import relationshipby.web.rest.TestUtil;

class AppUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppUser.class);
        AppUser appUser1 = getAppUserSample1();
        AppUser appUser2 = new AppUser();
        assertThat(appUser1).isNotEqualTo(appUser2);

        appUser2.setId(appUser1.getId());
        assertThat(appUser1).isEqualTo(appUser2);

        appUser2 = getAppUserSample2();
        assertThat(appUser1).isNotEqualTo(appUser2);
    }

    @Test
    void domainTest() {
        AppUser appUser = getAppUserRandomSampleGenerator();
        Domain domainBack = getDomainRandomSampleGenerator();

        appUser.setDomain(domainBack);
        assertThat(appUser.getDomain()).isEqualTo(domainBack);

        appUser.domain(null);
        assertThat(appUser.getDomain()).isNull();
    }
}
