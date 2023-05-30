/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ActItem, Activity } from 'pages/Analysis';
import { Dispatch, SetStateAction } from 'react';
import Plot from 'react-plotly.js';
import stressCauses from '../assets/datas/stress_cause.json';
import stressSolutions from '../assets/datas/stress_solution.json';

function BarGraph(props: {
  hover: ActItem;
  click: ActItem;
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

  const causeColor = yCauses.map((name) =>
    name === props.click.name && props.click.type === 'get'
      ? '#bd2b2b'
      : name === props.hover.name && props.hover.type === 'get'
      ? '#d43b3b'
      : '#E26464',
  );

  const solutionColor = ySolution.map((name) =>
    name === props.click.name && props.click.type === 'release'
      ? '#1f55a6'
      : name === props.hover.name && props.hover.type === 'release'
      ? '#4476c2'
      : '#6496E2',
  );

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
              marker: { color: causeColor },
              hoverinfo: 'x',
              hovertemplate: '%{x} times<extra></extra>',
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
              range: [0, 30],
            },
            yaxis: {
              visible: false,
              fixedrange: true,
            },
            font: { size: 10 },
          }}
          config={{
            displayModeBar: false,
          }}
          onClick={(data) => {
            if (data.points) {
              const point = data.points[0];
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
              hoverinfo: 'x',
              hovertemplate: '%{x} times<extra></extra>',
              marker: { color: solutionColor },
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
              range: [0, 40],
            },
            yaxis: {
              visible: false,
              fixedrange: true,
            },
            font: { size: 10 },
          }}
          config={{
            displayModeBar: false,
          }}
          onClick={(data) => {
            if (data.points) {
              const point = data.points[0];
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
