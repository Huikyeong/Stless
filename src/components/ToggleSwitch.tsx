/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function ToggleSwitch(props: { isOn: boolean; onClickHandler: () => void }) {
  const { isOn, onClickHandler } = props;

  return (
    <div
      css={css`
        display: flex;
        width: 45px;
        gap: 3px;
      `}
    >
      <div
        css={css`
          box-sizing: border-box;
          display: flex;
          align-items: center;
          height: 25px;
          width: 45px;
          border-radius: 50px;

          padding: 3px;
          background-color: ${isOn ? '#6496e2' : '#dddddd'};

          cursor: pointer;
          transition: all 0.25s ease;
        `}
        onClick={onClickHandler}
      >
        <div
          css={css`
            position: relative;
            left: ${isOn ? '20px' : 0};

            display: flex;
            align-items: center;
            width: 19px;
            height: 19px;
            border-radius: 45px;

            background-color: white;

            transition: all 0.25s ease;
            overflow: hidden;

            font-weight: 200;
            font-size: 10px;
            color: #666666;
          `}
        >
          <div
            css={css`
              position: relative;
              left: ${isOn ? '-20px' : '0px'};
              top: 3px;
              width: 19px;
              height: 19px;
              justify-content: center;
              align-items: center;
              transition: all 0.25s ease;
            `}
          >
            OFF
          </div>
          <div
            css={css`
              position: relative;
              left: ${isOn ? '-15px' : '5px'};
              top: 3px;
              width: 19px;
              height: 19px;
              justify-content: center;
              align-items: center;
              transition: all 0.25s ease;
            `}
          >
            ON
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
