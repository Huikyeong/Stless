/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Plot from 'react-plotly.js';
import sankeyFullData from '../assets/datas/sankey.json';

const getSankeyData = (getTagList: string[]) => {
  return getTagList.length !== 0
    ? sankeyFullData.filter((v) => getTagList.includes(v.source))
    : sankeyFullData;
};

const makeGetTagList: (getTagList: string[]) => string[] = (
  getTagList: string[],
) => {
  const sankeyData = getSankeyData(getTagList);

  const effectGetMap = new Map<string, number>();
  sankeyData.forEach((v) => {
    if (effectGetMap.has(v.source))
      effectGetMap.set(v.source, effectGetMap.get(v.source)! + v.value);
    else effectGetMap.set(v.source, v.value);
  });

  return Array.from(effectGetMap)
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);
};

const makeReleaseTagList: (getTagList: string[]) => string[] = (
  getTagList: string[],
) => {
  const sankeyData = getSankeyData(getTagList);

  const effectReleaseMap = new Map<string, number>();
  sankeyData.forEach((v) => {
    if (effectReleaseMap.has(v.target))
      effectReleaseMap.set(v.target, effectReleaseMap.get(v.target)! + v.value);
    else effectReleaseMap.set(v.target, v.value);
  });

  return Array.from(effectReleaseMap)
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);
};

const tagList: string[] = Array.from(
  new Set(sankeyFullData.map((v) => v.source)),
);

const initGetTagList: string[] = makeGetTagList([]).slice(0, 3);

const initReleaseTagList: string[] = makeReleaseTagList(initGetTagList);

function SankeyDiagram(props: { selectedTagList: string[] }) {
  /* eslint-disable */
  const sankeyData = getSankeyData(props.selectedTagList);
  const sources = makeGetTagList(props.selectedTagList);
  const targets = makeReleaseTagList(props.selectedTagList);
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
              hoverinfo: 'skip',
              node: {
                pad: 60,
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
          config={{
            displayModeBar: false,
          }}
        />
      </div>
    </div>
  );
}

export {
  SankeyDiagram,
  tagList,
  makeReleaseTagList,
  initGetTagList,
  initReleaseTagList,
};
