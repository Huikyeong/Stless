/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as dfd from 'danfojs';
import { ActItem } from 'pages/Analysis';
import { Data, Shape } from 'plotly.js';
import { useEffect, useMemo, useState } from 'react';
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
  const [zoomRange, setZoomRange] = useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);
  const dataList = useMemo(() => {
    return dfActivityQuery.map((shape) => {
      const data: Data = {
        type: 'scatter',
        mode: 'lines',
        opacity: 0,
        x: [
          shape.x0 ? shape.x0 : '',
          shape.x0 ? shape.x0 : '',
          shape.x1 ? shape.x1 : '',
          shape.x1 ? shape.x1 : '',
          shape.x0 ? shape.x0 : '',
        ],
        y: [-0.5, 6.5, 6.5, -0.5, -0.5],
        name: shape.name?.slice(0, shape.name?.indexOf('-')),
        hoverlabel: {
          bgcolor: shape.fillcolor,
        },
        hoveron: 'fills',
      };
      return data;
    });
  }, [dfActivity, dfActivityQuery]);

  useEffect(() => {
    setDfActivityQuery(
      dfActivityQuery.map((shape) => {
        if (
          shape.name?.includes(click.name) &&
          click.type !== undefined &&
          shape.name.includes(click.type)
        ) {
          shape.opacity = 0.8;
        } else if (
          shape.name?.includes(hover.name) &&
          hover.type !== undefined &&
          shape.name.includes(hover.type)
        ) {
          shape.opacity = 0.5;
        } else {
          shape.opacity = 0.2;
        }
        return shape;
      }),
    );
  }, [hover, click]);

  if (dfStressQuery.size === 0) {
    const rawStress = require('assets/datas/stress_p0701.csv');
    dfd
      .readCSV(rawStress)
      .then((df: dfd.DataFrame) => {
        df = df.addColumn('day', dfd.toDateTime(df['date']).dayOfMonth());
        setDfStress(df);
        // setDfStressQuery(df);
        if (selectedRange.start && selectedRange.end) {
          setDfStressQuery(
            df
              .query(
                df['day']
                  .gt(selectedRange.start - 1)
                  .and(df['day'].lt(selectedRange.end + 1)),
              )
              .resetIndex(),
          );
        }
      })
      .catch((err) => console.log(err));
  }

  if (dfActivityQuery.length === 0) {
    const rawDetected = require('assets/datas/detected_p0701.csv');
    dfd
      .readCSV(rawDetected)
      .then((df: dfd.DataFrame) => {
        const shapes: Partial<Shape>[] = [];
        for (let i = 0; i < df.shape[0]; i++) {
          const shape: Partial<Shape> = {
            type: 'rect',
            layer: 'below',
            y0: -0.5,
            y1: 6.5,
            fillcolor:
              df.iloc({ rows: [i] })['type'].values[0] === 'release'
                ? '#6496E2'
                : '#E26464',
            opacity: 0.2,
            line: {
              color: 'rgba(0,0,0,0)',
            },
          };
          shape.name =
            df.iloc({ rows: [i] })['activity'].values[0] +
            '-' +
            df.iloc({ rows: [i] })['type'].values[0];
          shape.x0 = df.iloc({ rows: [i] })['start'].values[0];
          shape.x1 = df.iloc({ rows: [i] })['end'].values[0];
          shapes.push(shape);
        }
        setDfActivity(shapes);
        // setDfActivityQuery(shapes);
        setDfActivityQuery(
          shapes.filter(
            (shape) =>
              new Date(shape.x0!).getDate() > selectedRange.start! - 1 &&
              new Date(shape.x1!).getDate() < selectedRange.end! + 1,
          ),
        );
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
        <b>Stress Level</b> change over{' '}
        <b>
          2019.05.
          {dateRange[0].toString().padStart(2, '0')} ~ 2019.05.
          {dateRange[1].toString().padStart(2, '0')}
        </b>
      </p>
      <Plot
        data={[
          {
            x: dfStressQuery['date']?.values,
            y: dfStressQuery['Stress']?.values.map((v: number) => v + 3),
            type: 'scatter',
            mode: 'lines',
            marker: { color: '#838383' },
            line: { shape: 'spline', smoothing: 0.2 },
            hoverinfo: 'skip',
            name: 'line',
          },
          ...dataList,
        ]}
        layout={{
          width: 710,
          height: 510,
          margin: {
            l: 20,
            r: 10,
            b: 20,
            t: 20,
            pad: 4,
          },
          yaxis: {
            fixedrange: true,
            showgrid: false,
            zeroline: false,
            range: [-0.5, 6.5],
          },
          xaxis: {
            tickformat: '%m-%d %I:%M',
            range: zoomRange,
          },
          shapes: dfActivityQuery,
          showlegend: false,
        }}
        onRelayout={(event) => {
          setZoomRange([event['xaxis.range[0]']!, event['xaxis.range[1]']!]);
        }}
      />
    </div>
  );
}

export default LineGraph;
