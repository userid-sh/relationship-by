package relationshipby.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import relationshipby.domain.Domain;
import relationshipby.repository.DomainRepository;
import relationshipby.service.DomainService;
import relationshipby.service.dto.DomainDTO;
import relationshipby.service.mapper.DomainMapper;

/**
 * Service Implementation for managing {@link relationshipby.domain.Domain}.
 */
@Service
@Transactional
public class DomainServiceImpl implements DomainService {

    private static final Logger LOG = LoggerFactory.getLogger(DomainServiceImpl.class);

    private final DomainRepository domainRepository;

    private final DomainMapper domainMapper;

    public DomainServiceImpl(DomainRepository domainRepository, DomainMapper domainMapper) {
        this.domainRepository = domainRepository;
        this.domainMapper = domainMapper;
    }

    @Override
    public DomainDTO save(DomainDTO domainDTO) {
        LOG.debug("Request to save Domain : {}", domainDTO);
        Domain domain = domainMapper.toEntity(domainDTO);
        domain = domainRepository.save(domain);
        return domainMapper.toDto(domain);
    }

    @Override
    public DomainDTO update(DomainDTO domainDTO) {
        LOG.debug("Request to update Domain : {}", domainDTO);
        Domain domain = domainMapper.toEntity(domainDTO);
        domain = domainRepository.save(domain);
        return domainMapper.toDto(domain);
    }

    @Override
    public Optional<DomainDTO> partialUpdate(DomainDTO domainDTO) {
        LOG.debug("Request to partially update Domain : {}", domainDTO);

        return domainRepository
            .findById(domainDTO.getId())
            .map(existingDomain -> {
                domainMapper.partialUpdate(existingDomain, domainDTO);

                return existingDomain;
            })
            .map(domainRepository::save)
            .map(domainMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DomainDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Domains");
        return domainRepository.findAll(pageable).map(domainMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DomainDTO> findOne(Long id) {
        LOG.debug("Request to get Domain : {}", id);
        return domainRepository.findById(id).map(domainMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Domain : {}", id);
        domainRepository.deleteById(id);
    }
}
