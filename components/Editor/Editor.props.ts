import { EditorState } from 'draft-js';

export interface EditorProps {
  placeholder?: string;
  editorState?: EditorState;
  onEditorStateChange?: (state: EditorState) => void;
  onChange?: any;
  className?: string;
  label?: string;
}