/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as HelpIcon } from 'assets/icons/help-circle.svg';
import BarGraph from 'components/BarGraph';
import Calendar from 'components/Calendar';
import Header from 'components/Header';
import LineGraph from 'components/LineGraph';
import { useState } from 'react';

function Analysis() {
  /* eslint-disable */
  const [isTutorialOn, setIsTutorialOn] = useState(false);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100vw;
        height: 100vh;

        background: #f5f5f5;
      `}
    >
      <Header />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;
          height: 100%;
          overflow-y: scroll;

          background: white;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        `}
      >
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            align-items: space-between;
            gap: 20px;

            width: 1140px;

            padding: 30px 0 50px 0;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 40px;
            `}
          >
            <Calendar />
            <BarGraph />
          </div>
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              width: 100%;
              height: 100%;
            `}
          >
            <LineGraph />
          </div>
        </div>
      </div>
      {/* floating guide button */}
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
          onClick={() => setIsTutorialOn(!isTutorialOn)}
        >
          <HelpIcon
            id='helpIcon'
            css={css`
              width: 30px;
              height: 30px;
              fill: ${isTutorialOn ? `#6496e2` : `#b3b3b3`};

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
              Turn {isTutorialOn ? 'off' : 'on'} the Guide
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
    </div>
  );
}

export default Analysis;
