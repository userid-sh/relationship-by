package relationshipby.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link relationshipby.domain.UserProperty} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserPropertyDTO implements Serializable {

    private Long id;

    private String strValue;

    private AppUserDTO user;

    @Schema(description = "by UserProperty.domain == DomainProperty.domain\nrequired by DomainProperty.mandatory")
    private DomainPropertyDTO domainProperty;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrValue() {
        return strValue;
    }

    public void setStrValue(String strValue) {
        this.strValue = strValue;
    }

    public AppUserDTO getUser() {
        return user;
    }

    public void setUser(AppUserDTO user) {
        this.user = user;
    }

    public DomainPropertyDTO getDomainProperty() {
        return domainProperty;
    }

    public void setDomainProperty(DomainPropertyDTO domainProperty) {
        this.domainProperty = domainProperty;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserPropertyDTO)) {
            return false;
        }

        UserPropertyDTO userPropertyDTO = (UserPropertyDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, userPropertyDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserPropertyDTO{" +
            "id=" + getId() +
            ", strValue='" + getStrValue() + "'" +
            ", user=" + getUser() +
            ", domainProperty=" + getDomainProperty() +
            "}";
    }
}
