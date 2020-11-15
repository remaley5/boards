import React, { useRef, useEffect, useCallback, useState, useContext } from "react";
import { Text as KonvaText, Transformer } from "react-konva";
import { TextContext } from "../../../context";
import { LIMITS } from "./constants";
import { selectShape, transformTextShape, moveShape } from "./state";

const boundBoxCallbackForText = (oldBox, newBox) => {
    if (
        newBox.width < LIMITS.TEXT.MIN ||
        newBox.height < LIMITS.TEXT.MIN ||
        newBox.width > LIMITS.TEXT.MAX ||
        newBox.height > LIMITS.TEXT.MAX
    ) {
        return oldBox;
    }
    newBox.width = Math.max(30, newBox.width)
    return newBox;
};


export function Text({ id, isSelected, type, canvas, stage, layer, ...shapeProps }) {
    const shapeRef = useRef();
    const transformerRef = useRef();
    const [textValue, setTextValue] = useState('enter text')
    const {text, setText} = useContext(TextContext);

    useEffect(() => {
        if (isSelected) {
            transformerRef.current.nodes([shapeRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleSelect = useCallback(
        (event) => {
            event.cancelBubble = true;
            selectShape(id);
        },
        [id]
    );

    const handleDoubleClick = event => {
        const node = shapeRef.current
        const stageBox = stage.current.container().getBoundingClientRect();
        node.hide();
        const tr = transformerRef.current
        transformerRef.current.hide();

        const textPosition = shapeRef.current.getAbsolutePosition();
        const areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
        }

        let textarea = document.createElement('textarea')
        document.body.appendChild(textarea)
        textarea.value = node.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = node.width() * 2 + 'px';
        textarea.style.height =
          node.height() * 2 + 5 + 'px';
        textarea.style.fontSize = node.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '10px';
        textarea.style.margin = '10px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = node.lineHeight();
        textarea.style.fontFamily = node.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = node.align();
        textarea.style.color = node.fill();
        let rotation = node.rotation();
        let transform = '';

        if (rotation) {
          transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;

        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        textarea.style.height = 'auto';

        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        const removeTextarea = () => {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            node.show();
            tr.show();
        }


          function handleOutsideClick(e) {
            if (e.target !== textarea) {
              node.text(textarea.value);
              removeTextarea();
            }
          }
          setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
          });
    }

    const handleDrag = useCallback(
        (event) => {
            moveShape(id, event);
        },
        [id]
    );

    const handleTransform = useCallback(
        (event) => {
            transformTextShape(shapeRef.current, id, event);
        },
        [id]
    );

    useEffect(() => {
        console.log('TEXT', text)
    }, [text])

    return (
        <>
            <KonvaText
                className='text-box'
                text={textValue}
                onDblClick={handleDoubleClick}
                onClick={handleSelect}
                onTap={handleSelect}
                onDragStart={handleSelect}
                crossOrigin='Anonymous'
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={handleDrag}
                onTransform={handleTransform}
            />
            {isSelected && (
                <Transformer
                    enabledAnchors={[
                        'middle-left',
                        'middle-right',
                    ]}
                    anchorSize={5}
                    borderDash={[6, 2]}
                    ref={transformerRef}
                    boundBoxFunc={boundBoxCallbackForText}
                />
            )}
        </>
    );
}
