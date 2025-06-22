package relationshipby.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static relationshipby.domain.DomainTestSamples.*;

import org.junit.jupiter.api.Test;
import relationshipby.web.rest.TestUtil;

class DomainTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Domain.class);
        Domain domain1 = getDomainSample1();
        Domain domain2 = new Domain();
        assertThat(domain1).isNotEqualTo(domain2);

        domain2.setId(domain1.getId());
        assertThat(domain1).isEqualTo(domain2);

        domain2 = getDomainSample2();
        assertThat(domain1).isNotEqualTo(domain2);
    }
}
