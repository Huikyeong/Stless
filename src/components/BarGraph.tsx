/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Plot from 'react-plotly.js';
import stressCauses from '../assets/datas/stress_cause.json';
import stressSolutions from '../assets/datas/stress_solution.json';

function BarGraph() {
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
      <p
        css={css`
          font-weight: 1000;
          font-size: 17px;
          letter-spacing: 0.05em;
          color: #e26464;
        `}
      >
        Get <b>From...</b>
      </p>
      <Plot
        data={[
          {
            y: yCauses,
            x: xCauses,
            hoverinfo: 'skip',
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
          xaxis: {
            visible: false,
          },
          colorway: ['#E26464'],
        }}
      />
      <p
        css={css`
          font-weight: 1000;
          font-size: 17px;
          letter-spacing: 0.05em;
          color: #6496e2;
        `}
      >
        Released <b>by...</b>
      </p>
      <Plot
        data={[
          {
            y: ySolution,
            x: xSolution,
            hoverinfo: 'skip',
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
          xaxis: {
            visible: false,
          },
          colorway: ['#6496E2'],
        }}
      />
    </div>
  );
}

export default BarGraph;
