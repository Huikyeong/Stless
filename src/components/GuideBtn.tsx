/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as HelpIcon } from 'assets/icons/help-circle.svg';

export default function GuideBtn(props: {
  isGuideOn: boolean;
  onClickHandler: () => void;
}) {
  return (
    <div
      css={css`
        position: fixed;
        bottom: 50px;
        right: 50px;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
      `}
    >
      <div
        css={css`
          position: relative;

          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          border: 1px solid #d9d9d9;
          &: hover > #helpIcon {
            fill: #a8bfe2;
          }
          &: hover > div {
            display: flex;
          }
        `}
        onClick={props.onClickHandler}
      >
        <HelpIcon
          id='helpIcon'
          css={css`
            width: 30px;
            height: 30px;
            fill: ${props.isGuideOn ? `#6496e2` : `#b3b3b3`};

            transition: all 0.2s;
          `}
        />
        <div
          css={css`
            position: absolute;
            bottom: 40px;
            right: 0px;
            display: none;
            flex-direction: column;
            align-items: flex-end;
            opacity: 0.8;
          `}
        >
          <p
            css={css`
              box-sizing: border-box;
              padding: 8px 15px;
              border-radius: 5px;
              text-align: center;
              width: 140px;
              background: black;
              color: white;
              font-weight: 400;
              font-size: 12px;
            `}
          >
            Turn {props.isGuideOn ? 'off' : 'on'} the Guide
          </p>
          <div
            css={css`
              position: relative;
              right: 15px;
              width: 0;
              height: 0;
              border-bottom: 7px solid transparent;
              border-top: 7px solid black;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
            `}
          />
        </div>
      </div>
    </div>
  );
}
