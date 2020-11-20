import React, { useCallback, useEffect } from "react";
import TextEditor from './TextEditor'
import { useShapes, updateAttribute, deleteShape } from "../items/state";
import { TextareaAutosize } from "@material-ui/core";

const fonts = ['Times New Roman', 'Luminari', 'Courier New', 'Trattatello', 'Comic Sans MS', 'Arial Black']
const fontStyles = ['normal', 'bold', 'italic']
const textDecorations = ['line-through', 'underline', 'none']
const aligns = ['left', 'center', 'right']
const verticalAligns = ['top', 'middle', 'bottom']
// opacity (number), shadowColor(string), shadowBlur(number), shadowOffsetX(number), shadowOffsetY(number), shadowOpacity(Number)
const shapeSelector = (state) => state.shapes[state.selected];

const PropertiesPanel = ({ newText, setNewText }) => {
  const selectedShape = useShapes(shapeSelector);
  console.log('newText', newText)

  const updateAttr = useCallback((event) => {
    let attr = event.target.name;
    let value = event.target.value
    if (event.target.name == 'strokeWidth') {
      value = parseInt(event.target.value, 10)
    }
    console.log('ATTRIBUTE', attr, event.target.value)
    updateAttribute(attr, value);

  }, []);

  const handleMove = e => {
    console.log('moving....')
    selectedShape.moveToTop()
    console.log('moved...')
  }

  return (
    <div className="toolbelt">
      <h2 className='section__title'>toolbelt</h2>
      <div className="properties">
        {selectedShape ? (
          <div className='board__tools'>
            <div className="key type">
              <span className="value">{selectedShape.type}</span>
            </div>
            <button className='canvas__btn delete' onClick={deleteShape}>delete</button>
            {selectedShape.type === 'text' ?
              <div className='text-tools'>
                <div className='font-tools'>
                <div className='sel-prefs'>
                  <button className='drpdwn-def font' style={{ fontFamily: `${selectedShape.font}` }}>{selectedShape.fontFamily}</button>
                  <div className='sel'>
                    {
                      fonts.map((font) => (
                        <button className='drpdwn-opt font' id='text' style={{ fontFamily: `${font}` }} name='fontFamily' onClick={updateAttr} value={font}>{font}</button>
                      ))
                    }
                  </div>
                </div>
                <div className='sel-prefs'>
                  <button style={{ fontStyle: `${selectedShape.fontStyle}` }} className='drpdwn-def style'>Aa</button>
                  <div className='sel'>
                    {
                      fontStyles.map((fontStyle) => (
                        <button className='drpdwn-opt style' id='text' style={{ fontStyle: `${fontStyle}` }} name='fontStyle' onClick={updateAttr} value={fontStyle}>Aa</button>
                      ))
                    }
                  </div>
                </div>
                <div className='sel-prefs'>
                  <button style={{ textDecoration: `${selectedShape.textDecoration}` }} className='drpdwn-def style'>Aa</button>
                  <div className='sel'>
                    {
                        textDecorations.map((textDecoration) => (
                        <button className='drpdwn-opt style' id='text' style={{ textDecoration: `${textDecoration}` }} name='textDecoration' onClick={updateAttr} value={textDecoration}>Aa</button>
                      ))
                    }
                  </div>
                </div>
                </div>
                <div className='color'>
                <div className="slider">
                  <input
                    className="slider-value"
                    name="fontSize"
                    type="range"
                    min="10"
                    max="200"
                    value={selectedShape.fontSize}
                    onChange={updateAttr}
                  />
                </div>
                <input
                  className="color-value"
                  name="fill"
                  type="color"
                  value={selectedShape.fill}
                  onChange={updateAttr}
                />
                </div>
                <TextareaAutosize className='change-text' name='text' value={selectedShape.text} onChange={updateAttr} />
              </div>
              // <TextEditor setNewText={setNewText}/>
              :
              <div>
                <div className='color'>
                <input
                    className="value"
                    name="stroke"
                    type="color"
                    value={selectedShape.stroke}
                    onChange={updateAttr}
                  />
                  <input
                    className="value"
                    name="fill"
                    type="color"
                    value={selectedShape.fill}
                    onChange={updateAttr}
                  />
                </div>
                <div className="slider">
                  <input
                    className="slider-value"
                    name="strokeWidth"
                    type="range"
                    min="0"
                    max="20"
                    value={selectedShape.strokeWidth}
                    onChange={updateAttr}
                  />
                </div>
              </div>

            }
          </div>
        ) : (
            <div className="no-data">Nothing is selected</div>
          )}
      </div>
    </div>
  );
}


export default PropertiesPanel;
