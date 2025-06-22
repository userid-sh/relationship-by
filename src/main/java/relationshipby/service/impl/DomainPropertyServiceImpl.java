package relationshipby.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import relationshipby.domain.DomainProperty;
import relationshipby.repository.DomainPropertyRepository;
import relationshipby.service.DomainPropertyService;
import relationshipby.service.dto.DomainPropertyDTO;
import relationshipby.service.mapper.DomainPropertyMapper;

/**
 * Service Implementation for managing {@link relationshipby.domain.DomainProperty}.
 */
@Service
@Transactional
public class DomainPropertyServiceImpl implements DomainPropertyService {

    private static final Logger LOG = LoggerFactory.getLogger(DomainPropertyServiceImpl.class);

    private final DomainPropertyRepository domainPropertyRepository;

    private final DomainPropertyMapper domainPropertyMapper;

    public DomainPropertyServiceImpl(DomainPropertyRepository domainPropertyRepository, DomainPropertyMapper domainPropertyMapper) {
        this.domainPropertyRepository = domainPropertyRepository;
        this.domainPropertyMapper = domainPropertyMapper;
    }

    @Override
    public DomainPropertyDTO save(DomainPropertyDTO domainPropertyDTO) {
        LOG.debug("Request to save DomainProperty : {}", domainPropertyDTO);
        DomainProperty domainProperty = domainPropertyMapper.toEntity(domainPropertyDTO);
        domainProperty = domainPropertyRepository.save(domainProperty);
        return domainPropertyMapper.toDto(domainProperty);
    }

    @Override
    public DomainPropertyDTO update(DomainPropertyDTO domainPropertyDTO) {
        LOG.debug("Request to update DomainProperty : {}", domainPropertyDTO);
        DomainProperty domainProperty = domainPropertyMapper.toEntity(domainPropertyDTO);
        domainProperty = domainPropertyRepository.save(domainProperty);
        return domainPropertyMapper.toDto(domainProperty);
    }

    @Override
    public Optional<DomainPropertyDTO> partialUpdate(DomainPropertyDTO domainPropertyDTO) {
        LOG.debug("Request to partially update DomainProperty : {}", domainPropertyDTO);

        return domainPropertyRepository
            .findById(domainPropertyDTO.getId())
            .map(existingDomainProperty -> {
                domainPropertyMapper.partialUpdate(existingDomainProperty, domainPropertyDTO);

                return existingDomainProperty;
            })
            .map(domainPropertyRepository::save)
            .map(domainPropertyMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DomainPropertyDTO> findAll() {
        LOG.debug("Request to get all DomainProperties");
        return domainPropertyRepository
            .findAll()
            .stream()
            .map(domainPropertyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DomainPropertyDTO> findOne(Long id) {
        LOG.debug("Request to get DomainProperty : {}", id);
        return domainPropertyRepository.findById(id).map(domainPropertyMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete DomainProperty : {}", id);
        domainPropertyRepository.deleteById(id);
    }
}
