import React, { FC, useState } from 'react';
import { EditorProps } from './Editor.props';
import styles from './Editor.module.css';
import {EditorState, convertToRaw} from 'draft-js';
import {Editor as DraftEditor} from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export const Editor: FC<EditorProps> = ({ placeholder = 'Enter text here...' }) => {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  const handleEditorOnChange = (state) => {
    setEditorState(state);
  };

  return (
    <div className={styles.editor}>
      <DraftEditor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="editer-content"
        onEditorStateChange={handleEditorOnChange}
      />
    </div>
  );
};