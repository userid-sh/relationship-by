package relationshipby.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import relationshipby.web.rest.TestUtil;

class DomainPropertyDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DomainPropertyDTO.class);
        DomainPropertyDTO domainPropertyDTO1 = new DomainPropertyDTO();
        domainPropertyDTO1.setId(1L);
        DomainPropertyDTO domainPropertyDTO2 = new DomainPropertyDTO();
        assertThat(domainPropertyDTO1).isNotEqualTo(domainPropertyDTO2);
        domainPropertyDTO2.setId(domainPropertyDTO1.getId());
        assertThat(domainPropertyDTO1).isEqualTo(domainPropertyDTO2);
        domainPropertyDTO2.setId(2L);
        assertThat(domainPropertyDTO1).isNotEqualTo(domainPropertyDTO2);
        domainPropertyDTO1.setId(null);
        assertThat(domainPropertyDTO1).isNotEqualTo(domainPropertyDTO2);
    }
}
