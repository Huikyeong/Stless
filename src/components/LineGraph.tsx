/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as dfd from 'danfojs';
import { ActItem } from 'pages/Analysis';
import { Shape } from 'plotly.js';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useRecoilValue } from 'recoil';
import { selectedRangeAtom } from 'recoils';
import { colors } from 'utils/style';

interface Props {
  hover: ActItem;
  click: ActItem;
}

function LineGraph(props: Props) {
  /* eslint-disable */
  const { hover, click } = props;
  const selectedRange = useRecoilValue(selectedRangeAtom);
  const [dfStress, setDfStress] = useState<dfd.DataFrame>(new dfd.DataFrame());
  const [dfStressQuery, setDfStressQuery] = useState<dfd.DataFrame>(
    new dfd.DataFrame(),
  );
  const [dfActivity, setDfActivity] = useState<Partial<Shape>[]>([]);
  const [dfActivityQuery, setDfActivityQuery] = useState<Partial<Shape>[]>([]);
  const [dateRange, setDateRange] = useState<[number, number]>([
    selectedRange.start ?? 7,
    selectedRange.end ?? 14,
  ]);

  useEffect(() => {
    setDfActivityQuery(
      dfActivityQuery.map((shape) => {
        if (
          shape.name === click.name &&
          ((click.type === 'release' && shape.fillcolor === '#6496e2') ||
            (click.type === 'get' && shape.fillcolor === '#e26464'))
        ) {
          shape.opacity = 0.8;
        } else if (
          shape.name === hover.name &&
          ((click.type === 'release' && shape.fillcolor === '#6496e2') ||
            (click.type === 'get' && shape.fillcolor === '#e26464'))
        ) {
          shape.opacity = 0.5;
        } else {
          shape.opacity = 0.2;
        }
        shape.opacity =
          shape.name === click.name
            ? 0.8
            : shape.name === hover.name
            ? 0.5
            : 0.2;
        return shape;
      }),
    );
  }, [hover, click]);

  if (dfStressQuery.size === 0) {
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

  if (dfActivityQuery.length === 0) {
    const rawDetected = require('assets/datas/detected_p0703.csv');
    dfd
      .readCSV(rawDetected)
      .then((df: dfd.DataFrame) => {
        const shapes: Partial<Shape>[] = [];
        for (let i = 0; i < df.shape[0]; i++) {
          const shape: Partial<Shape> = {
            type: 'rect',
            layer: 'below',
            y0: -3.5,
            y1: 3.5,
            fillcolor:
              df.iloc({ rows: [i] })['type'].values[0] === 'release'
                ? '#6496E2'
                : '#E26464',
            opacity: 0.2,
            line: {
              color: 'rgba(0,0,0,0)',
            },
          };
          shape.name = df.iloc({ rows: [i] })['activity'].values[0];
          shape.x0 = df.iloc({ rows: [i] })['start'].values[0];
          shape.x1 = df.iloc({ rows: [i] })['end'].values[0];
          shapes.push(shape);
        }
        setDfActivity(shapes);
        setDfActivityQuery(shapes);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (
      dfStressQuery.size > 0 &&
      dfActivityQuery.length > 0 &&
      selectedRange.start &&
      selectedRange.end
    ) {
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
        dfActivity.filter(
          (shape) =>
            new Date(shape.x0!).getDate() > selectedRange.start! - 1 &&
            new Date(shape.x1!).getDate() < selectedRange.end! + 1,
        ),
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
        align-items: flex-end;

        height: 100%;
        background: #ffffff;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        border: 1px solid #ededed;
        border-radius: 15px;

        padding: 20px 40px 50px;
      `}
    >
      <p
        css={css`
          font-weight: 400;
          font-size: 16px;
          color: ${colors.black};
        `}
      >
        Stress change over{' '}
        <b>
          2023.05.
          {dateRange[0].toString().padStart(2, '0')} ~ 2023.05.
          {dateRange[1].toString().padStart(2, '0')}
        </b>
      </p>
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
          height: 550,
          margin: {
            l: 20,
            r: 10,
            b: 0,
            t: 20,
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
          shapes: dfActivityQuery,
        }}
      />
    </div>
  );
}

export default LineGraph;
