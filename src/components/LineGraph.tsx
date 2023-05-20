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
  const [dfStress, setDfStress] = useState<dfd.DataFrame>(new dfd.DataFrame());
  const [dfStressQuery, setDfStressQuery] = useState<dfd.DataFrame>(
    new dfd.DataFrame(),
  );
  const [dfActivity, setDfActivity] = useState<dfd.DataFrame>(
    new dfd.DataFrame(),
  );
  const [dfActivityQuery, setDfActivityQuery] = useState<dfd.DataFrame>(
    new dfd.DataFrame(),
  );
  const [dateRange, setDateRange] = useState<[number, number]>([
    selectedRange.start ?? 7,
    selectedRange.end ?? 14,
  ]);

  if (dfStressQuery.size == 0) {
    const rawStress = require('assets/datas/stress_p0703.csv');
    dfd
      .readCSV(rawStress)
      .then((df: dfd.DataFrame) => {
        df = df.addColumn('day', dfd.toDateTime(df['date']).dayOfMonth());
        setDfStressQuery(df);
        setDfStress(df);
      })
      .catch((err) => console.log(err));
  }

  if (dfActivityQuery.size == 0) {
    const rawDetected = require('assets/datas/detected_p0703.csv');
    dfd
      .readCSV(rawDetected)
      .then((df: dfd.DataFrame) => {
        setDfActivity(df);
        setDfActivityQuery(df);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (
      dfStressQuery.size > 0 &&
      dfActivityQuery.size > 0 &&
      selectedRange.start &&
      selectedRange.end
    ) {
      console.log(dfStress['date'].values);
      setDfStressQuery(
        dfStress
          .query(
            dfStress['day']
              .gt(selectedRange.start - 1)
              .and(dfStress['day'].lt(selectedRange.end + 1)),
          )
          .resetIndex(),
      );
      setDfActivityQuery(
        dfActivity.query(
          dfActivity['start']
            .gt(selectedRange.start - 1)
            .and(dfActivity['end'].lt(selectedRange.end + 1)),
        ),
      );
      setDateRange([selectedRange.start, selectedRange.end]);
    }
  }, [selectedRange]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      `}
    >
      <p
        css={css`
          font-weight: 400;
          font-size: 18px;
          margin: 2px;
        `}
      >
        Stress change over{' '}
        <b>
          2023.05.
          {dateRange[0].toString().padStart(2, '0')} ~ 2023.05.
          {dateRange[1].toString().padStart(2, '0')}
        </b>
      </p>
      <div
        css={css`
          box-sizing: border-box;
          display: flex;
          flex-direction: column;

          height: 100%;
          background: #ffffff;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
          border-radius: 15px;

          padding: 0px 40px 50px;
        `}
      >
        <Plot
          data={[
            {
              x: dfStressQuery['date']?.values,
              y: dfStressQuery['Stress']?.values,
              type: 'scatter',
              mode: 'lines',
              marker: { color: '#838383' },
              line: { shape: 'spline', smoothing: 0.2 },
            },
          ]}
          layout={{
            width: 710,
            height: 570,
            margin: {
              l: 20,
              r: 0,
              b: 0,
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
            shapes: [
              {
                type: 'rect',
                name: 'exercise',
                layer: 'below',
                x0: '2019-05-10 16:37:17',
                x1: '2019-05-12 13:38:36',
                y0: -3.5,
                y1: 3.5,
                fillcolor: '#6496E2',
                opacity: 0.4,
                line: {
                  color: 'rgba(0,0,0,0)',
                },
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default LineGraph;
