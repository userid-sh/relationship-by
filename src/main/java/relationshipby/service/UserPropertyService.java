package relationshipby.service;

import java.util.List;
import java.util.Optional;
import relationshipby.service.dto.UserPropertyDTO;

/**
 * Service Interface for managing {@link relationshipby.domain.UserProperty}.
 */
public interface UserPropertyService {
    /**
     * Save a userProperty.
     *
     * @param userPropertyDTO the entity to save.
     * @return the persisted entity.
     */
    UserPropertyDTO save(UserPropertyDTO userPropertyDTO);

    /**
     * Updates a userProperty.
     *
     * @param userPropertyDTO the entity to update.
     * @return the persisted entity.
     */
    UserPropertyDTO update(UserPropertyDTO userPropertyDTO);

    /**
     * Partially updates a userProperty.
     *
     * @param userPropertyDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<UserPropertyDTO> partialUpdate(UserPropertyDTO userPropertyDTO);

    /**
     * Get all the userProperties.
     *
     * @return the list of entities.
     */
    List<UserPropertyDTO> findAll();

    /**
     * Get the "id" userProperty.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserPropertyDTO> findOne(Long id);

    /**
     * Delete the "id" userProperty.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
