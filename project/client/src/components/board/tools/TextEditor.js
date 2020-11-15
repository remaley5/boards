// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, {useState, useContext} from 'react'
import ReactQuill, {getContents} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {TextContext} from '../.././../context'

const TextEditor = props => {
    const [theme, setTheme] = useState('snow')
    const {text, setText} = useContext(TextContext);

    const handleChange = (html) => {
      const text = html2Canvas(html)
      text.backgroundColor = 'rgba(0, 0, 0, 0)'
    }

    const handleThemeChange = newTheme => {
        if (newTheme === 'core') newTheme = null
        setTheme(newTheme)
    }

    return (
        <div>
          <ReactQuill
            theme={theme}
            onChange={handleChange}
            value={text}
            modules={TextEditor.modules}
            formats={TextEditor.formats}
            bounds={'.app'}
            placeholder={props.placeholder}
           />
         </div>
       )
}
  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  TextEditor.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  TextEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  /*
   * PropType validation
   */

  /*
   * Render component on page
   */

export default TextEditor
