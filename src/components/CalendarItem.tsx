/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function CalendarItem(props: {
  num: number | undefined;
  val: number | undefined;
}) {
  // value에 따라서 color 매칭
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

            font-weight: 200;
            font-size: 18px;
            letter-spacing: -0.1em;
            ${props.val
              ? `color: white;
            background: #a92222;
            cursor: pointer;`
              : `color: #b4b4b4;`}
          `}
        >
          {props.num}
        </div>
      ) : undefined}
    </div>
  );
}

export default CalendarItem;
