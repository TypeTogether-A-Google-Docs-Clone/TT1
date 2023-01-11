// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button, Row, Col, FormText } from 'reactstrap';
// import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//
// import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
// import { mapIdList } from 'app/shared/util/entity-utils';
// import { useAppDispatch, useAppSelector } from 'app/config/store';
//
// import { IUser } from 'app/shared/model/user.model';
// import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
// import { IDocument } from 'app/shared/model/document.model';
// import { getEntity, updateEntity, createEntity, reset } from './document.reducer';
//
// export const DocumentUpdate = () => {
//   const dispatch = useAppDispatch();
//
//   const navigate = useNavigate();
//
//   const { id } = useParams<'id'>();
//   const isNew = id === undefined;
//
//   const users = useAppSelector(state => state.userManagement.users);
//   const documentEntity = useAppSelector(state => state.document.entity);
//   const loading = useAppSelector(state => state.document.loading);
//   const updating = useAppSelector(state => state.document.updating);
//   const updateSuccess = useAppSelector(state => state.document.updateSuccess);
//
//   const handleClose = () => {
//     navigate('/document');
//   };
//
//   useEffect(() => {
//     if (isNew) {
//       dispatch(reset());
//     } else {
//       dispatch(getEntity(id));
//     }
//
//     dispatch(getUsers({}));
//   }, []);
//
//   useEffect(() => {
//     if (updateSuccess) {
//       handleClose();
//     }
//   }, [updateSuccess]);
//
//   const saveEntity = values => {
//     values.createdDate = convertDateTimeToServer(values.createdDate);
//     values.modifiedDate = convertDateTimeToServer(values.modifiedDate);
//
//     const entity = {
//       ...documentEntity,
//       ...values,
//       user: users.find(it => it.id.toString() === values.user.toString()),
//     };
//
//     if (isNew) {
//       dispatch(createEntity(entity));
//     } else {
//       dispatch(updateEntity(entity));
//     }
//   };
//
//   const defaultValues = () =>
//     isNew
//       ? {
//           createdDate: displayDefaultDateTime(),
//           modifiedDate: displayDefaultDateTime(),
//         }
//       : {
//           ...documentEntity,
//           createdDate: convertDateTimeFromServer(documentEntity.createdDate),
//           modifiedDate: convertDateTimeFromServer(documentEntity.modifiedDate),
//           user: documentEntity?.user?.id,
//         };
//
//   return (
//     <div>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <h2 id="typetogetherApp.document.home.createOrEditLabel" data-cy="DocumentCreateUpdateHeading">
//             Create or edit a Document
//           </h2>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col md="8">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
//               {!isNew ? <ValidatedField name="id" required readOnly id="document-id" label="ID" validate={{ required: true }} /> : null}
//               <ValidatedField
//                 label="Document Title"
//                 id="document-documentTitle"
//                 name="documentTitle"
//                 data-cy="documentTitle"
//                 type="text"
//                 validate={{
//                   required: { value: true, message: 'This field is required.' },
//                 }}
//               />
//               <ValidatedField
//                 label="Document Content"
//                 id="document-documentContent"
//                 name="documentContent"
//                 data-cy="documentContent"
//                 type="text"
//               />
//               <ValidatedField
//                 label="Created Date"
//                 id="document-createdDate"
//                 name="createdDate"
//                 data-cy="createdDate"
//                 type="datetime-local"
//                 placeholder="YYYY-MM-DD HH:mm"
//               />
//               <ValidatedField
//                 label="Modified Date"
//                 id="document-modifiedDate"
//                 name="modifiedDate"
//                 data-cy="modifiedDate"
//                 type="datetime-local"
//                 placeholder="YYYY-MM-DD HH:mm"
//               />
//               <ValidatedField id="document-user" name="user" data-cy="user" label="User" type="select">
//                 <option value="" key="0" />
//                 {users
//                   ? users.map(otherEntity => (
//                       <option value={otherEntity.id} key={otherEntity.id}>
//                         {otherEntity.login}
//                       </option>
//                     ))
//                   : null}
//               </ValidatedField>
//               <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/document" replace color="info">
//                 <FontAwesomeIcon icon="arrow-left" />
//                 &nbsp;
//                 <span className="d-none d-md-inline">Back</span>
//               </Button>
//               &nbsp;
//               <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
//                 <FontAwesomeIcon icon="save" />
//                 &nbsp; Save
//               </Button>
//             </ValidatedForm>
//           )}
//         </Col>
//       </Row>
//     </div>
//   );
// };
//
// export default DocumentUpdate;
