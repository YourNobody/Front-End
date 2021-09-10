import React, { FC, forwardRef, useState } from 'react';
import styles from './Editor.module.css';
import { EditorProps } from './Editor.props';
import {Editor as DraftEditor} from "react-draft-wysiwyg";

export const Editor: FC<EditorProps> = (props) => {
  return (
    <div className={styles.editor}>
      <DraftEditor
        {...props}
        wrapperClassName="demo-wrapper"
        editorClassName="editer-content"
      />
    </div>
  );
};