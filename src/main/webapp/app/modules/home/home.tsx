import './home.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';
import { useAppSelector, useAppDispatch } from 'app/config/store';
import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { IDocument } from 'app/shared/model/document.model';
import { getEntities, createEntity, updateEntity } from 'app/entities/document/document.reducer';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isNumber, ValidatedField, ValidatedForm, Translate, TextFormat } from 'react-jhipster';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import axios from 'axios';

export const Home = (props: any) => {
  const [editorContent, setEditorContent] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [readOnly, setReadOnly] = useState(false);
  const account = useAppSelector(state => state.authentication.account);
  const today = new Date().toISOString().substring(0, 10);
  const editorRef = useRef(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const documentEntity = useAppSelector(state => state.document.entity);
  const loading = useAppSelector(state => state.document.loading);
  const date = new Date();
  const showTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
          documentTitle: 'Quick Document',
          documentContent: content,
          createdDate: new Date(),
          modifiedDate: new Date(),
          user: {
            id: account.id,
            login: account.login,
          },
        });
        setSaveStatus('Saved');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditorChange = (content, editor) => {
    if (editorRef.current) {
      setDirty(editorRef.current.isDirty());
    }
  };

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const documentList = useAppSelector(state => state.document.entities);
  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

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
      <p></p>
      <Row>
        <Col md="12">
          {account?.login ? (
            <div className="Typetogether">
              <h2>Welcome to TypeTogether</h2>

              <div>
                <Alert color="success">You are logged in as user &quot;{account.login}&quot;.</Alert>
              </div>
              <div className="buttonFun">
                <Link
                  to="/document"
                  className="btn btn-primary jh-create-entity viewdoclink"
                  id="jh-create-entity"
                  data-cy="entityCreateButton"
                >
                  <FontAwesomeIcon icon="plus" />
                  &nbsp; View Your Documents
                </Link>
                <Link
                  to="/document/new"
                  className="btn btn-primary jh-create-entity createnewdoc"
                  id="jh-create-entity"
                  data-cy="entityCreateButton"
                >
                  <FontAwesomeIcon icon="plus" />
                  &nbsp; Create a new Document
                </Link>

                {dirty && <p>You have unsaved content!</p>}
              </div>
              <h3>Recent Documents</h3>
              <div className="table-responsive">
                {documentList && documentList.length > 0 ? (
                  <Table responsive className="table-striped">
                    <thead>
                      <tr>
                        <th>Document Title</th>
                        <th>Created Date</th>
                        <th>Modified Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {documentList.map((document, i) => (
                        <tr key={`entity-${i}`} data-cy="entityTable">
                          <td>
                            <Button className="viewdocanchorlink" tag={Link} to={`/document/${document.id}`} color="link" size="lg">
                              {document.documentTitle}
                            </Button>
                          </td>
                          <td>
                            {document.createdDate ? <TextFormat type="date" value={document.createdDate} format={APP_DATE_FORMAT} /> : null}
                          </td>
                          <td>
                            {document.modifiedDate ? (
                              <TextFormat type="date" value={document.modifiedDate} format={APP_DATE_FORMAT} />
                            ) : null}
                          </td>
                          <td className="text-end">
                            <div className="btn-group flex-btn-group-container"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !loading && <div className="alert alert-warning">No Documents found</div>
                )}
              </div>
            </div>
          ) : (
            <div id="mybigblock" className="myblock">
              <div id="linksblock">
                <h3 className="myh3">Together We Create</h3>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h4 className="myh4">
                  <i>"Coming together is a beginning, staying together is progress, and working together is success"</i>
                </h4>
                <p className="mypara">-Henry Ford&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <br />
                <br />
                <br />
                <br />
                You don&apos;t have an account yet?&nbsp;
                <Link to="/account/register" className="alert-link">
                  Register a new account
                </Link>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
              <div id="imageblock">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" width="800" height="400" className="coll-img" />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Home;
