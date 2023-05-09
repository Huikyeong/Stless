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
    'in rainy day',
    'hi',
    'huikyeong',
    'dataviz',
    'nanoquiz',
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

          background: white;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        `}
      >
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            width: 1240px;
            padding-top: 30px;
          `}
        >
          <div
            id='tag layout'
            css={css`
              display: flex;
              justify-content: center;
              width: 100%;
              min-height: 200px;
              gap: 40px;
            `}
          >
            <div
              id='drop layout'
              ref={drop}
              css={css`
                box-sizing: border-box;
                width: 320px;
                height: 100%;
                padding: 15px 20px;

                font-weight: 300;
                font-size: 16px;
                line-height: 24px;

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
                    <div
                      css={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        color: black;
                        font-weight: 600;

                        cursor: pointer;
                        &: hover {
                          opacity: 0.5;
                        }
                      `}
                      onClick={() =>
                        setSelectedTagList((prev) =>
                          prev.filter((selectedTag) => selectedTag !== tag),
                        )
                      }
                    >
                      {tag}
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
              width: 100%;
              height: 70%;
            `}
          >
            <p
              css={css`
                font-weight: 1000;
                font-size: 25px;
                letter-spacing: 0.05em;
                display: flex;
                justify-content: center;
              `}
            >
              Sankey <b>Diagram</b>
            </p>
          </div>
          <div
            css={css`
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              background: #ffffff;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
              border-radius: 15px;

              padding: 10px 20px;
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
                      color: 'black',
                      width: 0.5,
                    },
                    label: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
                    color: ['blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
                  },

                  link: {
                    source: [0, 1, 0, 2, 3, 3],
                    target: [2, 3, 3, 4, 4, 5],
                    value: [8, 4, 2, 8, 4, 2],
                  },
                },
              ]}
              layout={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommend;
