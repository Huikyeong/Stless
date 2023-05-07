/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function ToggleSwitch(props: {
  calMode: 'mon' | 'day';
  setCalMode: (_: 'mon' | 'day') => void;
}) {
  const { calMode, setCalMode } = props;

  return (
    <div
      css={css`
        display: flex;
        height: 50px;
        gap: 3px;
      `}
    >
      <div
        css={css`
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          width: 25px;
          height: 50px;
          border-radius: 50px;

          padding: 3px;
          background-color: #dddddd;

          cursor: pointer;
          transition: all 0.25s ease;
        `}
        onClick={() => setCalMode(calMode === 'mon' ? 'day' : 'mon')}
      >
        <div
          css={css`
            position: relative;
            top: ${calMode === 'day' ? '24px' : 0};
            width: 19px;
            height: 19px;
            border-radius: 45px;

            background-color: white;

            transition: all 0.25s ease;
          `}
        />
      </div>
      <div
        css={css`
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          width: 100%;
          height: 100%;

          font-size: 13px;
          font-weight: 300;
          color: #838383;

          padding: 5px;
        `}
      >
        <div
          css={css`
            ${calMode === 'mon'
              ? `font-weight: 700; letter-spacing: -0.05em;`
              : `font-weight: 300; letter-spacing: 0;`};
            transition: all 0.25s ease;
          `}
        >
          Monthly
        </div>
        <div
          css={css`
            ${calMode === 'day'
              ? `font-weight: 700; letter-spacing: -0.05em;`
              : `font-weight: 300; letter-spacing: 0;`};
            transition: all 0.25s ease;
          `}
        >
          Daily
        </div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
