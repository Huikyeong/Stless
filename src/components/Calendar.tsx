/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as LeftArrow } from 'assets/triangle-left.svg';
import { ReactComponent as RightArrow } from 'assets/triangle-right.svg';
import ToggleSwitch from 'components/ToggleSwitch';
import { useState } from 'react';

function Calendar() {
  const [calMode, setCalMode] = useState<'mon' | 'day'>('mon');

  return (
    <div
      css={css`
        display: flex;
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
            font-size: 24px;
            letter-spacing: 0.05em;
          `}
        >
          <LeftArrow
            css={css`
              cursor: pointer;
              &: hover {
                opacity: 0.7;
              }
            `}
          />
          MAR
          <RightArrow
            css={css`
              cursor: pointer;
              &: hover {
                opacity: 0.7;
              }
            `}
          />
        </div>
        dfdf
      </div>
      <ToggleSwitch calMode={calMode} setCalMode={setCalMode} />
    </div>
  );
}

export default Calendar;
