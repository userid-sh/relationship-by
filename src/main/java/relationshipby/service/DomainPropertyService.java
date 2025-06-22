package relationshipby.service;

import java.util.List;
import java.util.Optional;
import relationshipby.service.dto.DomainPropertyDTO;

/**
 * Service Interface for managing {@link relationshipby.domain.DomainProperty}.
 */
public interface DomainPropertyService {
    /**
     * Save a domainProperty.
     *
     * @param domainPropertyDTO the entity to save.
     * @return the persisted entity.
     */
    DomainPropertyDTO save(DomainPropertyDTO domainPropertyDTO);

    /**
     * Updates a domainProperty.
     *
     * @param domainPropertyDTO the entity to update.
     * @return the persisted entity.
     */
    DomainPropertyDTO update(DomainPropertyDTO domainPropertyDTO);

    /**
     * Partially updates a domainProperty.
     *
     * @param domainPropertyDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DomainPropertyDTO> partialUpdate(DomainPropertyDTO domainPropertyDTO);

    /**
     * Get all the domainProperties.
     *
     * @return the list of entities.
     */
    List<DomainPropertyDTO> findAll();

    /**
     * Get the "id" domainProperty.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DomainPropertyDTO> findOne(Long id);

    /**
     * Delete the "id" domainProperty.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
