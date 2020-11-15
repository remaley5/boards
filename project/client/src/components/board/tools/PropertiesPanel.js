import React, { useCallback } from "react";
import TextEditor from './TextEditor'
import { useShapes, updateAttribute } from "../items/state";

const shapeSelector = (state) => state.shapes[state.selected];

const PropertiesPanel = () => {
  const selectedShape = useShapes(shapeSelector);
  console.log('SELECTED', selectedShape)

  const updateAttr = useCallback((event) => {
    const attr = event.target.name;
    const value = parseInt(event.target.value, 10)
    console.log('ATTRIBUTE', attr, event.target.value)
    updateAttribute(attr, value);

  }, []);

  return (
    <aside className="toolbelt">
      <h2 className='section__title'>toolbelt</h2>
      <div className="properties">
        {selectedShape ? (
          <div className='board__tools'>
            <div className="key type">
              <span className="value">{selectedShape.type}</span>
            </div>
            {selectedShape.type === 'text' ?
              <TextEditor />
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
