package relationshipby.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import relationshipby.web.rest.TestUtil;

class UserPropertyDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserPropertyDTO.class);
        UserPropertyDTO userPropertyDTO1 = new UserPropertyDTO();
        userPropertyDTO1.setId(1L);
        UserPropertyDTO userPropertyDTO2 = new UserPropertyDTO();
        assertThat(userPropertyDTO1).isNotEqualTo(userPropertyDTO2);
        userPropertyDTO2.setId(userPropertyDTO1.getId());
        assertThat(userPropertyDTO1).isEqualTo(userPropertyDTO2);
        userPropertyDTO2.setId(2L);
        assertThat(userPropertyDTO1).isNotEqualTo(userPropertyDTO2);
        userPropertyDTO1.setId(null);
        assertThat(userPropertyDTO1).isNotEqualTo(userPropertyDTO2);
    }
}
