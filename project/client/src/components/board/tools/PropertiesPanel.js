import React, { useCallback } from "react";

import { useShapes, updateAttribute } from "../items/state";

const shapeSelector = (state) => state.shapes[state.selected];

const PropertiesPanel = () => {
  const selectedShape = useShapes(shapeSelector);
  // console.log(selectedShape)
  const updateAttr = useCallback((event) => {
    const attr = event.target.name;
    //console.log('PropertiesPanel-updateAttr', attr)
    updateAttribute(attr, event.target.value);
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
        ) : (
          <div className="no-data">Nothing is selected</div>
        )}
      </div>
    </aside>
  );
}


export default PropertiesPanel;
