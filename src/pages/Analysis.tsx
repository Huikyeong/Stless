/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BarGraph from 'components/BarGraph';
import Calendar from 'components/Calendar';
import Header from 'components/Header';
import LineGraph from 'components/LineGraph';
import Plot from 'react-plotly.js';

function Analysis() {
  /* eslint-disable */

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

            width: 1240px;
            height: 100%;

            padding-top: 30px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 50px;
              height: 100%;
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
    </div>
  );
}

export default Analysis;
