import './home.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';
import { useAppSelector, useAppDispatch } from 'app/config/store';
import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { IDocument } from 'app/shared/model/document.model';
import { getEntities, createEntity, updateEntity } from 'app/entities/document/document.reducer';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { mapIdList } from 'app/shared/util/entity-utils';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const documentEntity = useAppSelector(state => state.document.entity);
  const loading = useAppSelector(state => state.document.loading);
  const updating = useAppSelector(state => state.document.updating);
  const users = useAppSelector(state => state.userManagement.users);
  const updateSuccess = useAppSelector(state => state.document.updateSuccess);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { id } = useParams<'id'>();

  const isNew = id === undefined;

  const saveEntity = values => {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.modifiedDate = convertDateTimeToServer(values.modifiedDate);

    const entity = {
      ...documentEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          createdDate: displayDefaultDateTime(),
          modifiedDate: displayDefaultDateTime(),
        }
      : {
          ...documentEntity,
          createdDate: convertDateTimeFromServer(documentEntity.createdDate),
          modifiedDate: convertDateTimeFromServer(documentEntity.modifiedDate),
          user: documentEntity?.user?.id,
        };
  const handleClose = () => {
    navigate('/document');
  };

  return (
    <div>
      <h2>Welcome to TypeTogether</h2>
      <p className="lead">This is your homepage</p>

      <Row>
        {/*         <Col md="3" className="pad"> */}
        {/*           <span className="hipster rounded" /> */}
        {/*         </Col> */}
        <Col md="9">
          {/*           <h2>Welcome, Java Hipster!</h2> */}
          {/*           <p className="lead">Quick Create Document</p> */}
          {account?.login ? (
            <div>
              <Alert color="success">You are logged in as user &quot;{account.login}&quot;.</Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                If you want to
                <span>&nbsp;</span>
                <Link to="/login" className="alert-link">
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;) <br />- User (login=&quot;user&quot; and
                password=&quot;user&quot;).
              </Alert>

              <Alert color="warning">
                You don&apos;t have an account yet?&nbsp;
                <Link to="/account/register" className="alert-link">
                  Register a new account
                </Link>
              </Alert>
            </div>
          )}
        </Col>
      </Row>

      <div className="buttons">
        <div className="managementbutton">
          <Link to="/document" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Document Management
          </Link>
        </div>
        {/*         <div className="createbutton"> */}
        {/*                   <Link to="/document/new" className="btn btn-success jh-create-entity" id="jh-save-entity" data-cy="entityCreateButton"> */}
        {/*                     <FontAwesomeIcon icon="save" /> */}
        {/*                     &nbsp; Save Current Document */}
        {/*                   </Link> */}
        {/*           <Button color="success" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}> */}
        {/*             <FontAwesomeIcon icon="save" /> */}
        {/*             &nbsp; Save Current Document */}
        {/*           </Button> */}
        {/*         </div> */}
      </div>
      <ValidatedForm defaultValues={defaultValues()} onSubmit={createEntity}>
        {!isNew ? <ValidatedField name="id" required readOnly id="document-id" label="ID" validate={{ required: true }} /> : null}
        <ValidatedField
          label="Document Title (* required)"
          id="document-documentTitle"
          name="documentTitle"
          data-cy="documentTitle"
          type="text"
          validate={{
            required: { value: true, message: 'This field is required.' },
          }}
        />

        <Editor
          apiKey="pc7rqzul9mdcfrch6wdkvminyzqgq5isq7dd7jj5pdikjwnb"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
        <div className="saveButton">
          <button
            className="btn btn-success jh-create-entity"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            type="submit"
            disabled={updating}
            onClick={log}
          >
            <FontAwesomeIcon icon="save" />
            &nbsp;Save Document
          </button>
        </div>
        {/*       <textarea id="textarea"></textarea> */}
      </ValidatedForm>
    </div>
  );
};

export default Home;
