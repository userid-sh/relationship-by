package relationshipby.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static relationshipby.domain.DomainPropertyTestSamples.*;
import static relationshipby.domain.DomainTestSamples.*;

import org.junit.jupiter.api.Test;
import relationshipby.web.rest.TestUtil;

class DomainPropertyTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DomainProperty.class);
        DomainProperty domainProperty1 = getDomainPropertySample1();
        DomainProperty domainProperty2 = new DomainProperty();
        assertThat(domainProperty1).isNotEqualTo(domainProperty2);

        domainProperty2.setId(domainProperty1.getId());
        assertThat(domainProperty1).isEqualTo(domainProperty2);

        domainProperty2 = getDomainPropertySample2();
        assertThat(domainProperty1).isNotEqualTo(domainProperty2);
    }

    @Test
    void domainTest() {
        DomainProperty domainProperty = getDomainPropertyRandomSampleGenerator();
        Domain domainBack = getDomainRandomSampleGenerator();

        domainProperty.setDomain(domainBack);
        assertThat(domainProperty.getDomain()).isEqualTo(domainBack);

        domainProperty.domain(null);
        assertThat(domainProperty.getDomain()).isNull();
    }
}
