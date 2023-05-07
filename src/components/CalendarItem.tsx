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
          width: calc(260px / 7);
        `}
      />
    );
  }

  const selectedRange = useRecoilValue(selectedRangeAtom);

  const isSelected =
    selectedRange.start &&
    selectedRange.end &&
    selectedRange.start <= props.info.num &&
    selectedRange.end >= props.info.num;

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
        console.log(prevRange);
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

        width: calc(260px / 7);
      `}
    >
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

          ${isSelected ? `outline: 2px solid black;` : undefined}

          ${props.info.val
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
