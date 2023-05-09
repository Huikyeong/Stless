/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ClickLeftIcon } from 'assets/icons/click-left.svg';
import DragItem from 'components/DragItem';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import Plot from 'react-plotly.js';
import Header from '../components/Header';

function Recommend() {
  const [selectedTagList, setSelectedTagList] = useState<string[]>([]);
  const tagList: string[] = [
    'exercise',
    'study',
    'use phone a lot',
    'use phone less',
    'in shiny day',
    'in rainy day',
    'in windy day',
    'wake up late',
    'wake up early',
    'sleep late',
    'sleep early',
  ]; // Before drop.

  const [, drop] = useDrop(() => ({
    accept: 'cause',
    drop: (item: { text: string }) => {
      setSelectedTagList((prev) => [...prev, item.text]);
    },
  }));

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100vw;
        height: 100vh;

        background: #f5f5f5;
      `}
    >
      <Header />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;
          height: 100%;
          overflow-y: scroll;

          background: white;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        `}
      >
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 30px;
            width: 1140px;
            padding: 50px 0 50px;
          `}
        >
          <div
            id='tag layout'
            css={css`
              display: flex;
              justify-content: center;
              width: 100%;
              height: fit-content;
              gap: 40px;
            `}
          >
            <div
              id='drop layout'
              ref={drop}
              css={css`
                box-sizing: border-box;
                width: 320px;
                min-height: 200px;
                height: fit-content;
                padding: 20px 28px 28px;

                font-weight: 300;
                font-size: 18px;
                line-height: 28px;

                background: #ffffff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
                border-radius: 15px;
              `}
            >
              I got stress <br /> when{' '}
              {selectedTagList.length === 0 && (
                <span
                  css={css`
                    color: #a7a7a7;
                  `}
                >
                  Drag here!
                </span>
              )}
              <span
                css={css`
                  display: flex;
                  flex-wrap: wrap;
                `}
              >
                {selectedTagList.map((tag, index) => (
                  <div
                    key={tag}
                    css={css`
                      display: flex;
                      margin-right: 5px;
                    `}
                  >
                    {selectedTagList.length - 1 === index &&
                      selectedTagList.length > 1 && (
                        <p
                          css={css`
                            margin-right: 7px;
                          `}
                        >
                          and
                        </p>
                      )}
                    <div
                      css={css`
                        position: relative;
                        display: flex;
                        align-items: center;

                        color: black;
                        font-weight: 600;

                        cursor: pointer;
                        &: hover > p {
                          opacity: 0.3;
                        }
                        &: hover > div {
                          width: 100%;
                          opacity: 1;
                        }
                      `}
                      onClick={() =>
                        setSelectedTagList((prev) =>
                          prev.filter((selectedTag) => selectedTag !== tag),
                        )
                      }
                    >
                      <div
                        css={css`
                          position: absolute;
                          width: 0%;
                          height: 2px;
                          border-radius: 2px;
                          background: #c84242;
                          opacity: 0;
                          transition: width 0.3s ease;
                        `}
                      />
                      <p>{tag}</p>
                    </div>
                    {selectedTagList.length - 1 === index ? '.' : ','}
                  </div>
                ))}
              </span>
            </div>
            <div
              id='guide layout'
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;

                height: 100%;

                font-weight: 400;
                font-size: 8px;
                line-height: 110%;

                color: #a7a7a7;
              `}
            >
              <ClickLeftIcon
                css={css`
                  position: relative;
                  top: 5px;
                  width: 28px;
                  height: 28px;
                `}
              />
              <ArrowLeftIcon />
              drag
              <br />
              and
              <br />
              drop
            </div>
            <div
              id='drag layout'
              css={css`
                box-sizing: border-box;
                display: flex;
                gap: 10px;

                width: 540px;
                height: 100%;
                padding: 15px 20px;

                background: #e9e9e9;
                border-radius: 15px;
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-wrap: wrap;
                  width: 100%;
                  height: min-content;
                  gap: 10px;
                `}
              >
                {tagList
                  .filter((tag) => !selectedTagList.includes(tag))
                  .map((tag) => (
                    <DragItem key={tag} text={tag} />
                  ))}
              </div>
            </div>
          </div>
          <div
            id='sankey layout'
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              height: 70%;
            `}
          >
            <p
              css={css`
                font-weight: 400;
                font-size: 14px;
                display: flex;
                color: gray;
              `}
            >
              cause factors
            </p>
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

                    node: {
                      pad: 15,
                      thickness: 30,
                      line: {
                        color: '#FFFFFF',
                        width: 0.5,
                      },
                      label: [
                        'study',
                        'sleep late',
                        'wake up early',
                        'sleep early',
                        'in shiny day',
                        'use phone less',
                      ],
                      color: [
                        '#E4C6C6',
                        '#E4C6C6',
                        '#E4C6C6',
                        '#B3CAED',
                        '#B3CAED',
                        '#B3CAED',
                      ],
                    },

                    link: {
                      source: [0, 1, 1, 1, 2, 2],
                      target: [3, 3, 4, 5, 3, 5],
                      value: [3, 4, 3, 5, 5, 3],
                    },
                  },
                ]}
                layout={{
                  width: 900,
                  height: 400,
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
            <p
              css={css`
                font-weight: 400;
                font-size: 14px;
                display: flex;
                color: gray;
              `}
            >
              solution factors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommend;
