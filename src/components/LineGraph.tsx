/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as dfd from 'danfojs';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useRecoilValue } from 'recoil';
import { selectedRangeAtom } from 'recoils';

function LineGraph() {
  /* eslint-disable */
  const selectedRange = useRecoilValue(selectedRangeAtom);
  const [df, setDf] = useState<dfd.DataFrame>(new dfd.DataFrame());
  const [dfStress, setDfStress] = useState<dfd.DataFrame>(new dfd.DataFrame());
  const [dateRange, setDateRange] = useState<[number, number]>([
    selectedRange.start ?? 7,
    selectedRange.end ?? 14,
  ]);

  if (dfStress.size == 0) {
    const someTextContent = require('assets/datas/stress_p703.csv');
    dfd
      .readCSV(someTextContent)
      .then((df: dfd.DataFrame) => {
        df = df.addColumn('day', dfd.toDateTime(df['date']).dayOfMonth());
        setDfStress(df);
        setDf(df);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (dfStress.size > 0 && selectedRange.start && selectedRange.end) {
      setDf(
        dfStress
          .query(
            dfStress['day']
              .gt(selectedRange.start - 1)
              .and(dfStress['day'].lt(selectedRange.end + 1)),
          )
          .resetIndex(),
      );
      setDateRange([selectedRange.start, selectedRange.end]);
    }
  }, [selectedRange]);

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
      <p
        css={css`
          font-weight: 800;
          font-size: 22px;
          letter-spacing: 0.05em;
        `}
      >
        Stress change over 2023.05.
        {dateRange[0].toString().padStart(2, '0')} ~ 2023.05.
        {dateRange[1].toString().padStart(2, '0')}
      </p>
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
            range: [-3.5, 3.5],
          },
        }}
      />
    </div>
  );
}

export default LineGraph;
