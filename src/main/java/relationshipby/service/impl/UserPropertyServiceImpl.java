package relationshipby.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import relationshipby.domain.UserProperty;
import relationshipby.repository.UserPropertyRepository;
import relationshipby.service.UserPropertyService;
import relationshipby.service.dto.UserPropertyDTO;
import relationshipby.service.mapper.UserPropertyMapper;

/**
 * Service Implementation for managing {@link relationshipby.domain.UserProperty}.
 */
@Service
@Transactional
public class UserPropertyServiceImpl implements UserPropertyService {

    private static final Logger LOG = LoggerFactory.getLogger(UserPropertyServiceImpl.class);

    private final UserPropertyRepository userPropertyRepository;

    private final UserPropertyMapper userPropertyMapper;

    public UserPropertyServiceImpl(UserPropertyRepository userPropertyRepository, UserPropertyMapper userPropertyMapper) {
        this.userPropertyRepository = userPropertyRepository;
        this.userPropertyMapper = userPropertyMapper;
    }

    @Override
    public UserPropertyDTO save(UserPropertyDTO userPropertyDTO) {
        LOG.debug("Request to save UserProperty : {}", userPropertyDTO);
        UserProperty userProperty = userPropertyMapper.toEntity(userPropertyDTO);
        userProperty = userPropertyRepository.save(userProperty);
        return userPropertyMapper.toDto(userProperty);
    }

    @Override
    public UserPropertyDTO update(UserPropertyDTO userPropertyDTO) {
        LOG.debug("Request to update UserProperty : {}", userPropertyDTO);
        UserProperty userProperty = userPropertyMapper.toEntity(userPropertyDTO);
        userProperty = userPropertyRepository.save(userProperty);
        return userPropertyMapper.toDto(userProperty);
    }

    @Override
    public Optional<UserPropertyDTO> partialUpdate(UserPropertyDTO userPropertyDTO) {
        LOG.debug("Request to partially update UserProperty : {}", userPropertyDTO);

        return userPropertyRepository
            .findById(userPropertyDTO.getId())
            .map(existingUserProperty -> {
                userPropertyMapper.partialUpdate(existingUserProperty, userPropertyDTO);

                return existingUserProperty;
            })
            .map(userPropertyRepository::save)
            .map(userPropertyMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserPropertyDTO> findAll() {
        LOG.debug("Request to get all UserProperties");
        return userPropertyRepository.findAll().stream().map(userPropertyMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserPropertyDTO> findOne(Long id) {
        LOG.debug("Request to get UserProperty : {}", id);
        return userPropertyRepository.findById(id).map(userPropertyMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete UserProperty : {}", id);
        userPropertyRepository.deleteById(id);
    }
}
