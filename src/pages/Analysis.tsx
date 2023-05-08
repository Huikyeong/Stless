/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Calendar from 'components/Calendar';
import Header from 'components/Header';
import * as dfd from 'danfojs';
import { react } from 'plotly.js';
import { useState } from 'react';
import Plot from 'react-plotly.js';

function Analysis() {
  /* eslint-disable */
  const [df, setDf] = useState<dfd.DataFrame>(new dfd.DataFrame());
  if (df.size == 0) {
    const someTextContent = require('assets/datas/stress_p703.csv');
    dfd
      .readCSV(someTextContent)
      .then((df: dfd.DataFrame) => {
        setDf(df);
      })
      .catch((err) => console.log(err));
  }

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
                  width: 300,
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
                  width: 300,
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
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              width: 100%;
              height: 100%;
            `}
          >
            <Plot
              data={[
                {
                  x: df['date']?.values,
                  y: df['Stress']?.values,
                  type: 'scatter',
                  mode: 'lines',
                  marker: { color: '#838383' },
                  line: { shape: 'spline', smoothing: 0.2 },
                },
              ]}
              layout={{
                title: {
                  text: 'Stress change over 2023.05.08 ~ 2023.05.15',
                  xref: 'paper',
                  x: 0.01,
                },
                width: 870,
                height: 700,
                margin: {
                  l: 50,
                  r: 50,
                  b: 50,
                  t: 50,
                  pad: 4,
                },
                xaxis: {
                  rangeslider: {},
                },
                yaxis: {
                  fixedrange: true,
                  showgrid: false,
                  zeroline: false,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
