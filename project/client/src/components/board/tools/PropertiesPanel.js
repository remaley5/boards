import React, { useCallback, useEffect } from "react";
import TextEditor from './TextEditor'
import { useShapes, updateAttribute } from "../items/state";

const shapeSelector = (state) => state.shapes[state.selected];

const PropertiesPanel = ({ newText, setNewText }) => {
  const selectedShape = useShapes(shapeSelector);
  console.log('newText', newText)

  const updateAttr = useCallback((event) => {
    let attr = event.target.name;
    let value = event.target.value
    if (event.target.name == 'strokeWidth'){
      value = parseInt(event.target.value, 10)
    }
    console.log('ATTRIBUTE', attr, event.target.value)
    updateAttribute(attr, value);

  }, []);

  return (
    <aside className="toolbelt">
      <h2 className='section__title'>toolbelt</h2>
      <div className="properties">
        {selectedShape || newText ? (
          <div className='board__tools'>
            <div className="key type">
              {newText ?
                <span className="value">text</span>
                : <span className="value">{selectedShape.type}</span>
              }
            </div>
            {newText || selectedShape.type === 'text' ?
              <TextEditor setNewText={setNewText}/>
              :
              <div>

                <div className="key">
                  <input
                    className="value"
                    name="stroke"
                    type="color"
                    value={selectedShape.stroke}
                    onChange={updateAttr}
                  />
                Stroke{" "}
                </div>
                <div className="slider">
                  <input
                    className="slider-value"
                    name="strokeWidth"
                    type="range"
                    min="0"
                    max="11"
                    value={selectedShape.strokeWidth}
                    onChange={updateAttr}
                  />
                Thickness{" "}
                </div>
                <div className="key">
                  <input
                    className="value"
                    name="fill"
                    type="color"
                    value={selectedShape.fill}
                    onChange={updateAttr}
                  />
                Fill{" "}
                </div>
              </div>

            }
          </div>
        ) : (
            <div className="no-data">Nothing is selected</div>
          )}
      </div>
    </aside>
  );
}


export default PropertiesPanel;
