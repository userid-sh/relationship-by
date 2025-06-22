package relationshipby.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link relationshipby.domain.Domain} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DomainDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DomainDTO)) {
            return false;
        }

        DomainDTO domainDTO = (DomainDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, domainDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DomainDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
