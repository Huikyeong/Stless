/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Plot from 'react-plotly.js';
import sankeyFullData from '../assets/datas/sankey.json';

const effectMap = new Map<string, number>();
sankeyFullData.forEach((v) => {
  if (effectMap.has(v.source))
    effectMap.set(v.source, effectMap.get(v.source)! + v.value);
  else effectMap.set(v.source, v.value);
});

const tagList: string[] = Array.from(
  new Set(sankeyFullData.map((v) => v.source)),
);

const initTagList: string[] = Array.from(effectMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map((item) => item[0]);

function SankeyDiagram(props: { selectedTagList: string[] }) {
  /* eslint-disable */
  const sankeyData =
    props.selectedTagList.length !== 0
      ? sankeyFullData.filter((v) => props.selectedTagList.includes(v.source))
      : sankeyFullData;

  const sources = Array.from(new Set(sankeyData.map((v) => v.source)));
  const targets = Array.from(new Set(sankeyData.map((v) => v.target)));
  const values = sankeyData.map((v) => v.value);

  const sourceMap = new Map<string, number>();
  const targetMap = new Map<string, number>();
  sources.forEach((key, i) => sourceMap.set(key, i));
  targets.forEach((key, i) => targetMap.set(key, i + sources.length));

  return (
    <div
      id='sankey layout'
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 65%;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Plot
          data={[
            {
              type: 'sankey',
              orientation: 'v',
              arrangement: 'fixed',
              node: {
                pad: 75,
                thickness: 30,
                line: {
                  color: '#FFFFFF',
                  width: 0.5,
                },
                label: [...sources, ...targets],
                color: [
                  ...Array(sources.length).fill('#E4C6C6'),
                  ...Array(targets.length).fill('#B3CAED'),
                ],
              },

              link: {
                source: sankeyData.map((value) => sourceMap.get(value.source)!),
                target: sankeyData.map((value) => targetMap.get(value.target)!),
                value: values,
              },
            },
          ]}
          layout={{
            width: 800,
            height: 350,
            margin: {
              l: 0,
              r: 0,
              b: 10,
              t: 10,
              pad: 4,
            },
          }}
        />
      </div>
    </div>
  );
}

export { SankeyDiagram, tagList, initTagList };
