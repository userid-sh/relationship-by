package relationshipby.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link relationshipby.domain.DomainProperty} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DomainPropertyDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Boolean mandatory;

    private DomainDTO domain;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getMandatory() {
        return mandatory;
    }

    public void setMandatory(Boolean mandatory) {
        this.mandatory = mandatory;
    }

    public DomainDTO getDomain() {
        return domain;
    }

    public void setDomain(DomainDTO domain) {
        this.domain = domain;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DomainPropertyDTO)) {
            return false;
        }

        DomainPropertyDTO domainPropertyDTO = (DomainPropertyDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, domainPropertyDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DomainPropertyDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", mandatory='" + getMandatory() + "'" +
            ", domain=" + getDomain() +
            "}";
    }
}
