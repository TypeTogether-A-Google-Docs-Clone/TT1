package com.typetogether.kash.service.mapper;

import com.typetogether.kash.domain.Document;
import com.typetogether.kash.domain.User;
import com.typetogether.kash.service.dto.DocumentDTO;
import com.typetogether.kash.service.dto.UserDTO;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-10T12:45:50-0500",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 17.0.5 (Eclipse Adoptium)"
)
@Component
public class DocumentMapperImpl implements DocumentMapper {

    @Override
    public Document toEntity(DocumentDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Document document = new Document();

        document.setId( dto.getId() );
        document.setCollaboratorList( dto.getCollaboratorList() );
        document.setViewerList( dto.getViewerList() );
        document.setDocumentTitle( dto.getDocumentTitle() );
        byte[] documentContent = dto.getDocumentContent();
        if ( documentContent != null ) {
            document.setDocumentContent( Arrays.copyOf( documentContent, documentContent.length ) );
        }
        document.setDocumentContentContentType( dto.getDocumentContentContentType() );
        document.setCreatedDate( dto.getCreatedDate() );
        document.setModifiedDate( dto.getModifiedDate() );
        document.setLocationOfTheDocument( dto.getLocationOfTheDocument() );
        document.owner( userDTOToUser( dto.getOwner() ) );

        return document;
    }

    @Override
    public List<Document> toEntity(List<DocumentDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Document> list = new ArrayList<Document>( dtoList.size() );
        for ( DocumentDTO documentDTO : dtoList ) {
            list.add( toEntity( documentDTO ) );
        }

        return list;
    }

    @Override
    public List<DocumentDTO> toDto(List<Document> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<DocumentDTO> list = new ArrayList<DocumentDTO>( entityList.size() );
        for ( Document document : entityList ) {
            list.add( toDto( document ) );
        }

        return list;
    }

    @Override
    public void partialUpdate(Document entity, DocumentDTO dto) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getCollaboratorList() != null ) {
            entity.setCollaboratorList( dto.getCollaboratorList() );
        }
        if ( dto.getViewerList() != null ) {
            entity.setViewerList( dto.getViewerList() );
        }
        if ( dto.getDocumentTitle() != null ) {
            entity.setDocumentTitle( dto.getDocumentTitle() );
        }
        byte[] documentContent = dto.getDocumentContent();
        if ( documentContent != null ) {
            entity.setDocumentContent( Arrays.copyOf( documentContent, documentContent.length ) );
        }
        if ( dto.getDocumentContentContentType() != null ) {
            entity.setDocumentContentContentType( dto.getDocumentContentContentType() );
        }
        if ( dto.getCreatedDate() != null ) {
            entity.setCreatedDate( dto.getCreatedDate() );
        }
        if ( dto.getModifiedDate() != null ) {
            entity.setModifiedDate( dto.getModifiedDate() );
        }
        if ( dto.getLocationOfTheDocument() != null ) {
            entity.setLocationOfTheDocument( dto.getLocationOfTheDocument() );
        }
        if ( dto.getOwner() != null ) {
            if ( entity.getOwner() == null ) {
                entity.owner( new User() );
            }
            userDTOToUser1( dto.getOwner(), entity.getOwner() );
        }
    }

    @Override
    public DocumentDTO toDto(Document s) {
        if ( s == null ) {
            return null;
        }

        DocumentDTO documentDTO = new DocumentDTO();

        documentDTO.setOwner( toDtoUserLogin( s.getOwner() ) );
        documentDTO.setId( s.getId() );
        documentDTO.setCollaboratorList( s.getCollaboratorList() );
        documentDTO.setViewerList( s.getViewerList() );
        documentDTO.setDocumentTitle( s.getDocumentTitle() );
        byte[] documentContent = s.getDocumentContent();
        if ( documentContent != null ) {
            documentDTO.setDocumentContent( Arrays.copyOf( documentContent, documentContent.length ) );
        }
        documentDTO.setDocumentContentContentType( s.getDocumentContentContentType() );
        documentDTO.setCreatedDate( s.getCreatedDate() );
        documentDTO.setModifiedDate( s.getModifiedDate() );
        documentDTO.setLocationOfTheDocument( s.getLocationOfTheDocument() );

        return documentDTO;
    }

    @Override
    public UserDTO toDtoUserLogin(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( user.getId() );
        userDTO.setLogin( user.getLogin() );

        return userDTO;
    }

    protected User userDTOToUser(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( userDTO.getId() );
        user.setLogin( userDTO.getLogin() );

        return user;
    }

    protected void userDTOToUser1(UserDTO userDTO, User mappingTarget) {
        if ( userDTO == null ) {
            return;
        }

        if ( userDTO.getId() != null ) {
            mappingTarget.setId( userDTO.getId() );
        }
        if ( userDTO.getLogin() != null ) {
            mappingTarget.setLogin( userDTO.getLogin() );
        }
    }
}
