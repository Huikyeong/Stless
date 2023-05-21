/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ActItem, Activity } from 'pages/Analysis';
import { Dispatch, SetStateAction } from 'react';
import Plot from 'react-plotly.js';
import stressCauses from '../assets/datas/stress_cause.json';
import stressSolutions from '../assets/datas/stress_solution.json';

function BarGraph(props: {
  // hover: Activity;
  // click: Activity;
  setHover: Dispatch<SetStateAction<ActItem>>;
  setClick: Dispatch<SetStateAction<ActItem>>;
}) {
  /* eslint-disable */
  const compare = (
    a: { category: String; value: number },
    b: { category: String; value: number },
  ) => a.value - b.value;

  const yCauses = stressCauses.sort(compare).map((d) => d.category);
  const xCauses = stressCauses.sort(compare).map((d) => d.value);
  const ySolution = stressSolutions.sort(compare).map((d) => d.category);
  const xSolution = stressSolutions.sort(compare).map((d) => d.value);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <div
        css={css`
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: white;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
          border: 1px solid #ededed;
          border-radius: 15px;
          padding: 15px 0 15px 20px;
        `}
      >
        <p
          css={css`
            font-weight: 1000;
            font-size: 14px;
            color: #e26464;
          `}
        >
          Get <b>From...</b>
        </p>
        <Plot
          divId='causePlot'
          data={[
            {
              y: yCauses,
              x: xCauses,
              type: 'bar',
              orientation: 'h',
              text: yCauses,
              textposition: 'outside',
            },
          ]}
          layout={{
            width: 240,
            height: 100,
            margin: {
              l: 0,
              r: 0,
              b: 0,
              t: 0,
              pad: 4,
            },
            xaxis: {
              visible: false,
              fixedrange: true,
              range: [0, 15],
            },
            yaxis: {
              visible: false,
              fixedrange: true,
            },
            colorway: ['#E26464'],
            font: { size: 10 },
          }}
          config={{
            displayModeBar: false,
          }}
          onClick={(data) => {
            if (data.points) {
              const point = data.points[0];
              console.log(point.y);
              props.setClick((prev) =>
                prev.name === point.y
                  ? { name: '' }
                  : { name: point.y as Activity, type: 'get' },
              );
            }
          }}
          onHover={(data) => {
            if (data.points) {
              const point = data.points[0];
              console.log(point.y);
              props.setHover({ name: point.y as Activity, type: 'get' });
            }
          }}
          onUnhover={() => props.setHover({ name: '' })}
        />
      </div>
      <div
        css={css`
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: white;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
          border: 1px solid #ededed;
          border-radius: 15px;
          padding: 15px 0 15px 20px;
        `}
      >
        <p
          css={css`
            font-weight: 1000;
            font-size: 14px;
            color: #6496e2;
          `}
        >
          Released <b>by...</b>
        </p>
        <Plot
          divId='solutionPlot'
          data={[
            {
              y: ySolution,
              x: xSolution,
              type: 'bar',
              orientation: 'h',
              text: ySolution,
              textposition: 'outside',
            },
          ]}
          layout={{
            width: 240,
            height: 100,
            margin: {
              l: 0,
              r: 0,
              b: 0,
              t: 0,
              pad: 4,
            },
            xaxis: {
              visible: false,
              fixedrange: true,
              range: [0, 15],
            },
            yaxis: {
              visible: false,
              fixedrange: true,
            },
            colorway: ['#6496E2'],
            font: { size: 10 },
          }}
          config={{
            displayModeBar: false,
          }}
          onClick={(data) => {
            if (data.points) {
              const point = data.points[0];
              console.log(point.y);
              props.setClick((prev) =>
                prev.name === point.y
                  ? { name: '' }
                  : { name: point.y as Activity, type: 'release' },
              );
            }
          }}
          onHover={(data) => {
            if (data.points) {
              const point = data.points[0];
              console.log(point.y);
              props.setHover({ name: point.y as Activity, type: 'release' });
            }
          }}
          onUnhover={() => props.setHover({ name: '' })}
        />
      </div>
    </div>
  );
}

export default BarGraph;
