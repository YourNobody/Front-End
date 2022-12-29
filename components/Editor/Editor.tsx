import React, { FC, forwardRef, useState } from 'react';
import styles from './Editor.module.css';
import { EditorProps } from './Editor.props';
import {Editor as DraftEditor} from "react-draft-wysiwyg";
import './Editor.css';
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";
import cn from "classnames";

export const Editor: FC<EditorProps> = ({ onChange, className, label, ...props }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
    return onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <div className={cn(styles.editorWrapper, className)}>
      {label ? <p className={styles.label}>{label}</p> : <></>}
      <DraftEditor
        {...props}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="demo-wrapper"
        editorClassName="editer-content"
      />
    </div>
  );
};