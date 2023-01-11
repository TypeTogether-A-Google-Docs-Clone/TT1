package com.typetogether.kash.service.mapper;

import com.typetogether.kash.domain.Document;
import com.typetogether.kash.domain.User;
import com.typetogether.kash.service.dto.DocumentDTO;
import com.typetogether.kash.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Document} and its DTO {@link DocumentDTO}.
 */
@Mapper(componentModel = "spring")
public interface DocumentMapper extends EntityMapper<DocumentDTO, Document> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    DocumentDTO toDto(Document s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
