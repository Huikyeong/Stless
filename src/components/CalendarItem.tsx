/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function CalendarItem(props: { num: number | undefined }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;

        width: calc(260px / 7);
      `}
    >
      {props.num ? (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 30px;
            background: #a92222;

            font-weight: 200;
            font-size: 18px;
            letter-spacing: -0.1em;
            color: white;
          `}
        >
          {props.num}
        </div>
      ) : undefined}
    </div>
  );
}

export default CalendarItem;
