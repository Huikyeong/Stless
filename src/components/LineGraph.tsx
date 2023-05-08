/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as dfd from 'danfojs';
import { useState } from 'react';
import Plot from 'react-plotly.js';

function LineGraph() {
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
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        border-radius: 15px;

        padding: 10px 20px;
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
            x: 0.0,
            font: {
              family: 'Noto Sans',
              size: 20,
            },
          },
          width: 800,
          height: 650,
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
  );
}

export default LineGraph;
