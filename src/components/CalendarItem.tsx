/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from 'utils/style';

function CalendarItem(props: {
  num: number | undefined;
  val: number | undefined;
}) {
  // value에 따라서 color 매칭
  let backColor;
  if (props.val === undefined) {
    backColor = 'white';
  } else if (props.val > 1.5) {
    backColor = colors.hitmap1;
  } else if (props.val > 0.5) {
    backColor = colors.hitmap2;
  } else if (props.val > -0.5) {
    backColor = colors.hitmap3;
  } else if (props.val > -1.5) {
    backColor = colors.hitmap4;
  } else {
    backColor = colors.hitmap5;
  }

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
            background-color: ${backColor};
            ${props.val
              ? `color: white;
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
