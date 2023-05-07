/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useDrag } from 'react-dnd';

function DragItem(props: { text: string }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'cause',
      item: { text: props.text },
      collect: (monitor: any) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );

  return (
    <div
      ref={dragRef}
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;

        height: 16px;
        padding: 5px 12px;

        background: #ffffff;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        opacity: ${opacity};
        cursor: pointer;

        font-weight: 400;
        font-size: 12px;
      `}
    >
      {props.text}
    </div>
  );
}

export default DragItem;
