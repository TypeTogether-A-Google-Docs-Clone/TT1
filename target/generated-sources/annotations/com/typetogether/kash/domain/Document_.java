package com.typetogether.kash.domain;

import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Document.class)
public abstract class Document_ {

	public static volatile SingularAttribute<Document, User> owner;
	public static volatile SingularAttribute<Document, String> documentContentContentType;
	public static volatile SingularAttribute<Document, Instant> createdDate;
	public static volatile SingularAttribute<Document, Instant> modifiedDate;
	public static volatile SingularAttribute<Document, String> locationOfTheDocument;
	public static volatile SingularAttribute<Document, Long> id;
	public static volatile SingularAttribute<Document, String> viewerList;
	public static volatile SingularAttribute<Document, byte[]> documentContent;
	public static volatile SingularAttribute<Document, String> documentTitle;
	public static volatile SingularAttribute<Document, String> collaboratorList;

	public static final String OWNER = "owner";
	public static final String DOCUMENT_CONTENT_CONTENT_TYPE = "documentContentContentType";
	public static final String CREATED_DATE = "createdDate";
	public static final String MODIFIED_DATE = "modifiedDate";
	public static final String LOCATION_OF_THE_DOCUMENT = "locationOfTheDocument";
	public static final String ID = "id";
	public static final String VIEWER_LIST = "viewerList";
	public static final String DOCUMENT_CONTENT = "documentContent";
	public static final String DOCUMENT_TITLE = "documentTitle";
	public static final String COLLABORATOR_LIST = "collaboratorList";

}

