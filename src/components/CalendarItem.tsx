/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { selectedRangeAtom } from 'recoils';
import { colors } from 'utils/style';

function CalendarItem(props: {
  info: { num: number; val: number | undefined } | undefined;
}) {
  if (props.info === undefined) {
    return (
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(228px / 7);
        `}
      />
    );
  }

  const selectedRange = useRecoilValue(selectedRangeAtom);

  const getOutlineStyle = (day: number) => {
    if (selectedRange.start === undefined) {
      return undefined;
    }

    if (selectedRange.end === undefined) {
      if (selectedRange.start === day) {
        return `border: 1.5px dashed #b4b4b4; border-radius: 36px;`;
      }
      return undefined;
    }

    if (selectedRange.start < day && selectedRange.end > day) {
      return `border-top: 1.5px solid #b4b4b4; border-bottom: 1.5px solid #b4b4b4;`;
    }
    if (selectedRange.start === day && selectedRange.end === day) {
      return `border: 1.5px solid #b4b4b4; border-radius: 36px;`;
    }
    if (selectedRange.start === day) {
      return `border-top: 1.5px solid #b4b4b4; border-bottom: 1.5px solid #b4b4b4; border-left: 1.5px solid #b4b4b4; border-radius: 36px 0 0 36px;`;
    }
    if (selectedRange.end === day) {
      return `border-top: 1.5px solid #b4b4b4; border-bottom: 1.5px solid #b4b4b4; border-right: 1.5px solid #b4b4b4; border-radius: 0 36px 36px 0;`;
    }
    return undefined;
  };

  // value에 따라서 color 매칭
  let backColor;
  if (props.info.val === undefined) {
    backColor = 'white';
  } else if (props.info.val > 1.5) {
    backColor = colors.hitmap1;
  } else if (props.info.val > 0.5) {
    backColor = colors.hitmap2;
  } else if (props.info.val > -0.5) {
    backColor = colors.hitmap3;
  } else if (props.info.val > -1.5) {
    backColor = colors.hitmap4;
  } else {
    backColor = colors.hitmap5;
  }

  const updateRange = useRecoilCallback(
    ({ set, snapshot }) =>
      (date: number) => {
        const prevRange = snapshot.getLoadable(selectedRangeAtom).getValue();
        if (
          prevRange.start === undefined ||
          (prevRange.start && prevRange.end)
        ) {
          set(selectedRangeAtom, { start: date });
          return;
        }

        if (prevRange.start > date) {
          set(selectedRangeAtom, { start: date, end: prevRange.start });
          return;
        }

        set(selectedRangeAtom, { start: prevRange.start, end: date });
      },
  );

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;

        width: calc(228px / 7);
        height: 32px;

        box-sizing: border-box;
        ${getOutlineStyle(props.info.num)}
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 28px;
          height: 28px;
          border-radius: 30px;

          font-weight: 200;
          font-size: 16px;
          letter-spacing: -0.1em;
          background-color: ${backColor};

          ${props.info.val !== undefined
            ? `color: white;
            cursor: pointer;`
            : `color: #b4b4b4;`}
        `}
        onClick={() => {
          if (props.info === undefined || props.info.val === undefined) {
            return;
          }
          updateRange(props.info.num);
        }}
      >
        {props.info.num}
      </div>
    </div>
  );
}

export default CalendarItem;
