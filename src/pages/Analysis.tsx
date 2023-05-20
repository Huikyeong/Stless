/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BarGraph from 'components/BarGraph';
import Calendar from 'components/Calendar';
import GuideBtn from 'components/GuideBtn';
import Header from 'components/Header';
import LineGraph from 'components/LineGraph';
import { useState } from 'react';

export type Activity = 'exercise' | 'study' | 'phone' | 'sleep' | '';

function Analysis() {
  /* eslint-disable */
  const [isGuideOn, setIsGuideOn] = useState(false);
  const [hover, setHover] = useState<Activity>('');
  const [click, setClick] = useState<Activity>('');

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100vw;
        height: 100vh;
        overflow-y: overlay;

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
        `}
      >
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            align-items: center;
            gap: 30px;

            // width: 1140px;

            padding: 20px 20px 20px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 20px;
            `}
          >
            <Calendar />
            <BarGraph />
          </div>
          <LineGraph hover={hover} click={click} />
        </div>
      </div>
      {/* guide page */}
      <div
        css={css`
          position: fixed;
          display: ${isGuideOn ? `flex` : `none`};
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
        `}
      >
        hi
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
