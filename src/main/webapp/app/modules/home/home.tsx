import './home.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';
import { useAppSelector, useAppDispatch } from 'app/config/store';
import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { IDocument } from 'app/shared/model/document.model';
import { getEntities, createEntity, updateEntity } from 'app/entities/document/document.reducer';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import axios from 'axios';

export const Home = (props: any) => {
  const [editorContent, setEditorContent] = useState('');
  //content that the TinyMCE editor initializes to
  const [initialContent, setInitialContent] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  //toggles TinyMCE editability
  const [readOnly, setReadOnly] = useState(false);

  //assigned logged in account information to account
  const account = useAppSelector(state => state.authentication.account);
  const today = new Date().toISOString().substring(0, 10);
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

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { id } = useParams<'id'>();

  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);

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
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), ['']);
  const save = async () => {
    try {
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        setDirty(false);
        editorRef.current.setDirty(false);
        setSaveStatus('Saving...');
        const response = await axios.post('/api/documents', {
          documentTitle: 'test',
          documentContent: content,
          createdDate: '2023-01-13T05:04:47.526Z',
          modifiedDate: '2023-01-13T05:04:47.526Z',
          user: {
            id: account.id,
            login: account.login,
          },
        });
        setSaveStatus('Saved');
      }
    } catch (error) {
      console.log(error);
      //handle error here
    }
  };
  const handleEditorChange = (content, editor) => {
    if (editorRef.current) {
      setDirty(editorRef.current.isDirty());
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
  return (
    <div>
      <h2>Welcome to TypeTogether</h2>
      <p className="lead">This is your homepage</p>
      <Row>
        <Col md="9">
          {account?.login ? (
            <div className="Typetogether">
              <div>
                <Alert color="success">You are logged in as user &quot;{account.login}&quot;.</Alert>
              </div>
              <div className="buttonFun">
                <Link to="/document/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
                  <FontAwesomeIcon icon="plus" />
                  &nbsp; Create a new Document
                </Link>
                <Link to="/document" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
                  <FontAwesomeIcon icon="plus" />
                  &nbsp; View Your Documents
                </Link>
                <button onClick={log}>Log editor content</button>
                <Button color="primary" onClick={save}>
                  Save
                </Button>
                {dirty && <p>You have unsaved content!</p>}
                <textarea id="textarea"></textarea>
              </div>

              <Editor
                id="editor"
                apiKey="pc7rqzul9mdcfrch6wdkvminyzqgq5isq7dd7jj5pdikjwnb"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="Hello World"
                init={{
                  height: 500,
                  menubar: true,
                  skin: 'fluent',
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
      <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
        <ValidatedField
          label="Document Title"
          id="document-documentTitle"
          name="documentTitle"
          data-cy="documentTitle"
          type="text"
          validate={{
            required: { value: true, message: 'This field is required.' },
          }}
        />
      </ValidatedForm>
    </div>
  );
};

export default Home;
