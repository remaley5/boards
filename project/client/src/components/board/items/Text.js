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
        // console.log('TEXT', text)
    }, [text])

    return (
        <>
            <KonvaText
                className='text-box'
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
                    anchorSize={5}
                    borderDash={[6, 2]}
                    ref={transformerRef}
                    boundBoxFunc={boundBoxCallbackForText}
                />
            )}
        </>
    );
}
