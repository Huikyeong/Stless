/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Calendar from 'components/Calendar';
import Header from 'components/Header';
import Plot from 'react-plotly.js';

function Analysis() {
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
            align-items: center;
            gap: 20px;

            width: 1040px;
            height: 100%;

            padding-top: 30px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              gap: 50px;
              height: 100%;
            `}
          >
            <Calendar />
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 10px;
              `}
            >
              <Plot
                data={[
                  {
                    y: [
                      'giraffes',
                      'orangutans',
                      'monkeys',
                      'huikyeong',
                      'cheolhwan',
                    ],
                    x: [5, 14, 16, 20, 23],
                    type: 'bar',
                    orientation: 'h',
                  },
                ]}
                layout={{
                  width: 350,
                  height: 150,
                  margin: {
                    l: 100,
                    r: 0,
                    b: 40,
                    t: 0,
                    pad: 4,
                  },
                  colorway: ['#E26464'],
                }}
              />
              <Plot
                data={[
                  {
                    y: [
                      'giraffes',
                      'orangutans',
                      'monkeys',
                      'huikyeong',
                      'cheolhwan',
                    ],
                    x: [5, 14, 16, 20, 23],
                    type: 'bar',
                    orientation: 'h',
                  },
                ]}
                layout={{
                  width: 350,
                  height: 150,
                  margin: {
                    l: 100,
                    r: 0,
                    b: 40,
                    t: 0,
                    pad: 4,
                  },
                  colorway: ['#6496E2'],
                }}
              />
            </div>
          </div>
          <div>line chart</div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
