package relationshipby.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import relationshipby.service.dto.DomainDTO;

/**
 * Service Interface for managing {@link relationshipby.domain.Domain}.
 */
public interface DomainService {
    /**
     * Save a domain.
     *
     * @param domainDTO the entity to save.
     * @return the persisted entity.
     */
    DomainDTO save(DomainDTO domainDTO);

    /**
     * Updates a domain.
     *
     * @param domainDTO the entity to update.
     * @return the persisted entity.
     */
    DomainDTO update(DomainDTO domainDTO);

    /**
     * Partially updates a domain.
     *
     * @param domainDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DomainDTO> partialUpdate(DomainDTO domainDTO);

    /**
     * Get all the domains.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DomainDTO> findAll(Pageable pageable);

    /**
     * Get the "id" domain.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DomainDTO> findOne(Long id);

    /**
     * Delete the "id" domain.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
