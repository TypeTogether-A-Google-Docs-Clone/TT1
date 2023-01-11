// import React, { useEffect } from 'react';
// import { useRef } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Button, Row, Col } from 'reactstrap';
// import { TextFormat } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Editor } from '@tinymce/tinymce-react';
// import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
// import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { getEntity } from './document.reducer';
//
// export const DocumentDetail = () => {
//   const dispatch = useAppDispatch();
//
//   const { id } = useParams<'id'>();
//
//   useEffect(() => {
//     dispatch(getEntity(id));
//   }, []);
//   // editor
//   const editorRef = useRef(null);
//   const log = () => {
//     if (editorRef.current) {
//       console.log(editorRef.current.getContent());
//     }
//   };
//
//   const documentEntity = useAppSelector(state => state.document.entity);
//   return (
//     <div>
//       <Row>
//         <Col md="8">
//           <h2 data-cy="documentDetailsHeading">Document</h2>
//           <dl className="jh-entity-details">
//             <dt>
//               <span id="id">ID</span>
//             </dt>
//             <dd>{documentEntity.id}</dd>
//             <dt>
//               <span id="documentTitle">Document Title</span>
//             </dt>
//             <dd>{documentEntity.documentTitle}</dd>
//             <dt>
//               <span id="documentContent">Document Content</span>
//             </dt>
//             <dd>
//               <Editor
//                 apiKey="pc7rqzul9mdcfrch6wdkvminyzqgq5isq7dd7jj5pdikjwnb"
//                 onInit={(evt, editor) => (editorRef.current = editor)}
//                 initialValue="<p>This is the initial content of the editor.</p>"
//                 init={{
//                   height: 500,
//                   menubar: false,
//                   plugins: [
//                     'advlist',
//                     'autolink',
//                     'lists',
//                     'link',
//                     'image',
//                     'charmap',
//                     'preview',
//                     'anchor',
//                     'searchreplace',
//                     'visualblocks',
//                     'code',
//                     'fullscreen',
//                     'insertdatetime',
//                     'media',
//                     'table',
//                     'code',
//                     'help',
//                     'wordcount',
//                   ],
//                   toolbar:
//                     'undo redo | blocks | ' +
//                     'bold italic forecolor | alignleft aligncenter ' +
//                     'alignright alignjustify | bullist numlist outdent indent | ' +
//                     'removeformat | help',
//                   content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
//                 }}
//               />
//               <button onClick={log}>Log editor content</button>
//               <textarea id="textarea">{documentEntity.documentContent}</textarea>
//             </dd>
//             {/*           <dd>{documentEntity.documentContent}</dd> */}
//             <dt>
//               <span id="createdDate">Created Date</span>
//             </dt>
//             <dd>
//               {documentEntity.createdDate ? <TextFormat value={documentEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
//             </dd>
//             <dt>
//               <span id="modifiedDate">Modified Date</span>
//             </dt>
//             <dd>
//               {documentEntity.modifiedDate ? <TextFormat value={documentEntity.modifiedDate} type="date" format={APP_DATE_FORMAT} /> : null}
//             </dd>
//             <dt>User</dt>
//             <dd>{documentEntity.user ? documentEntity.user.login : ''}</dd>
//           </dl>
//           <Button tag={Link} to="/document" replace color="info" data-cy="entityDetailsBackButton">
//             <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
//           </Button>
//           &nbsp;
//           <Button tag={Link} to={`/document/${documentEntity.id}/edit`} replace color="primary">
//             <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };
//
// export default DocumentDetail;
