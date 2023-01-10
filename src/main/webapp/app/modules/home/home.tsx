import './home.scss';
import { Link } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <p className="lead">This is your homepage</p>
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
      <button onClick={log}>Log editor content</button>
      <textarea id="textarea"></textarea>
      <Row>
        <Col md="3" className="pad">
          <span className="hipster rounded" />
        </Col>
        <Col md="9">
          <h2>Welcome, Java Hipster!</h2>
          <p className="lead">This is your homepage</p>
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
          <p>If you have any question on JHipster:</p>

          <ul>
            <li>
              <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
                JHipster homepage
              </a>
            </li>
            <li>
              <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
                JHipster on Stack Overflow
              </a>
            </li>
            <li>
              <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
                JHipster bug tracker
              </a>
            </li>
            <li>
              <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
                JHipster public chat room
              </a>
            </li>
            <li>
              <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">
                follow @jhipster on Twitter
              </a>
            </li>
          </ul>

          <p>
            If you like JHipster, don&apos;t forget to give us a star on{' '}
            <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            !
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

// // export default function App() {
//   const editorRef = useRef(null);
//   const log = () => {
//     if (editorRef.current) {
//       console.log(editorRef.current.getContent());
//     }
//   };
//   return (
//     <>
//       <Editor
//         apiKey='pc7rqzul9mdcfrch6wdkvminyzqgq5isq7dd7jj5pdikjwnb'
//         onInit={(evt, editor) => editorRef.current = editor}
//         initialValue="<p>This is the initial content of the editor.</p>"
//         init={{
//           height: 500,
//           menubar: false,
//           plugins: [
//             'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//             'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//             'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
//           ],
//           toolbar: 'undo redo | blocks | ' +
//             'bold italic forecolor | alignleft aligncenter ' +
//             'alignright alignjustify | bullist numlist outdent indent | ' +
//             'removeformat | help',
//           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//         }}
//       />
//       <button onClick={log}>Log editor content</button>
//     </>
//   );
// //   return (
//   <head>
//     <script src="https://cdn.tiny.cloud/1/pc7rqzul9mdcfrch6wdkvminyzqgq5isq7dd7jj5pdikjwnb/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
//   </head>
//   <body>
//     <textarea>
//       Welcome to TinyMCE!
//     </textarea>
//     <script>
//       tinymce.init({
//         selector: 'textarea',
//         plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
//         toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//         tinycomments_mode: 'embedded',
//         tinycomments_author: 'Author name',
//         mergetags_list: [
//           { value: 'First.Name', title: 'First Name' },
//           { value: 'Email', title: 'Email' },
//         ],
//       });
//     </script>
//   </body>
//   </html>
// import { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// export const Home = () => {
