/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Plot from 'react-plotly.js';

function BarGraph() {
  /* eslint-disable */

  return (
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
            y: ['giraffes', 'orangutans', 'monkeys', 'huikyeong', 'cheolhwan'],
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
            y: ['giraffes', 'orangutans', 'monkeys', 'huikyeong', 'cheolhwan'],
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
  );
}

export default BarGraph;
