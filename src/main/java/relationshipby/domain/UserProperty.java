package relationshipby.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A UserProperty.
 */
@Entity
@Table(name = "user_property")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserProperty implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "str_value")
    private String strValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "domain" }, allowSetters = true)
    private AppUser user;

    /**
     * by UserProperty.domain == DomainProperty.domain
     * required by DomainProperty.mandatory
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "domain" }, allowSetters = true)
    private DomainProperty domainProperty;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserProperty id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrValue() {
        return this.strValue;
    }

    public UserProperty strValue(String strValue) {
        this.setStrValue(strValue);
        return this;
    }

    public void setStrValue(String strValue) {
        this.strValue = strValue;
    }

    public AppUser getUser() {
        return this.user;
    }

    public void setUser(AppUser appUser) {
        this.user = appUser;
    }

    public UserProperty user(AppUser appUser) {
        this.setUser(appUser);
        return this;
    }

    public DomainProperty getDomainProperty() {
        return this.domainProperty;
    }

    public void setDomainProperty(DomainProperty domainProperty) {
        this.domainProperty = domainProperty;
    }

    public UserProperty domainProperty(DomainProperty domainProperty) {
        this.setDomainProperty(domainProperty);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProperty)) {
            return false;
        }
        return getId() != null && getId().equals(((UserProperty) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProperty{" +
            "id=" + getId() +
            ", strValue='" + getStrValue() + "'" +
            "}";
    }
}
