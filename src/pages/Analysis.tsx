/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BarGraph from 'components/BarGraph';
import Calendar from 'components/Calendar';
import GuideBtn from 'components/GuideBtn';
import Header from 'components/Header';
import LineGraph from 'components/LineGraph';
import { useState } from 'react';

function Analysis() {
  /* eslint-disable */
  const [isGuideOn, setIsGuideOn] = useState(false);

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
      <GuideBtn
        isGuideOn={isGuideOn}
        onClickHandler={() => setIsGuideOn(!isGuideOn)}
      />
    </div>
  );
}

export default Analysis;
