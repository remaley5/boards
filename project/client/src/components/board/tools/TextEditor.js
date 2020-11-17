// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, {useState, useContext, createRef} from 'react'
import ReactQuill, {getContents} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {TextContext} from '../../../context'
import {createText, createPhoto} from '../items/state'
import html2canvas from 'html2canvas'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

const TextEditor = props => {
    const [theme, setTheme] = useState('snow')
    // const {text, setText} = useContext(TextContext);
    const [html, setHtml] = useState('enter text')
    const quillRef = createRef();
    const {setNewText} = props
    const handleSubmit = async() => {
      const htmlToJpeg = document.querySelector('.ql-editor')
      const height = htmlToJpeg.clientHeight
      const width = htmlToJpeg.clientWidth
      console.log(htmlToJpeg)
      console.log(htmlToJpeg.clientHeight)
      const image = await toPng(document.querySelector('.ql-editor'), {
        backgroundColor: 'transparent',
      })
      console.log(image)
      // console.log(quillRef.current.state.value)
      // const quill = quillRef.current.state.value
      // const text = await html2canvas(quill)
      // console.log(text)
        createPhoto({
          currentPhoto: image,
          height,
          width,
          x: 377,
          y: 377,
        })
        setNewText(false)
    }

    return (
        <div>
          <ReactQuill
            theme={theme}
            value={html}
            modules={TextEditor.modules}
            formats={TextEditor.formats}
            onChange={setHtml}
            bounds={'.app'}
            placeholder={props.placeholder}
            ref={quillRef}
           />
           <button className='canvas__btn tool-btn' onClick={handleSubmit}>Add to canvas</button>
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
