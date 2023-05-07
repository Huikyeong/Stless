/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as LeftArrow } from 'assets/triangle-left.svg';
import { ReactComponent as RightArrow } from 'assets/triangle-right.svg';
import ToggleSwitch from 'components/ToggleSwitch';
import { useState } from 'react';
import CalendarItem from './CalendarItem';

function Calendar() {
  const [calMode, setCalMode] = useState<'mon' | 'day'>('mon');
  const dayList: Array<number | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  for (let i = 1; i <= 31; i += 1) {
    dayList.push(i);
  }

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 20px;

        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 800;
            font-size: 22px;
            letter-spacing: 0.05em;
          `}
        >
          <LeftArrow
            css={css`
              width: 15px;
              cursor: pointer;
              &: hover {
                opacity: 0.7;
              }
            `}
          />
          MAR
          <RightArrow
            css={css`
              width: 15px;
              cursor: pointer;
              &: hover {
                opacity: 0.7;
              }
            `}
          />
        </div>
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            width: 300px;
            background: #ffffff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
            border-radius: 15px;

            padding: 10px 20px;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-around;
              align-items: center;
              width: 100%;
              height: 25px;
              border-bottom: 1px solid #f1f1f1;

              font-weight: 400;
              font-size: 15px;
              color: #838383;
            `}
          >
            <p>S</p>
            <p>M</p>
            <p>T</p>
            <p>W</p>
            <p>T</p>
            <p>F</p>
            <p>S</p>
          </div>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              row-gap: 3px;
              padding: 5px 0;
            `}
          >
            {dayList.map((day) => (
              <CalendarItem key={day} num={day} val={1} />
            ))}
          </div>
        </div>
      </div>
      <ToggleSwitch calMode={calMode} setCalMode={setCalMode} />
    </div>
  );
}

export default Calendar;
