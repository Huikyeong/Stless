/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ClickLeftIcon } from 'assets/icons/click-left.svg';
import DragItem from 'components/DragItem';
import GuideBtn from 'components/GuideBtn';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import Plot from 'react-plotly.js';
import { colors } from 'utils/style';
import Header from '../components/Header';

function Recommend() {
  const [isGuideOn, setIsGuideOn] = useState(false);
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
        overflow-y: overlay;

        background: ${colors.bg};
      `}
    >
      <Header />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 30px 60px 30px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            background: white;
            border-radius: 15px;
          `}
        >
          <div
            id='tag layout'
            css={css`
              position: relative;
              display: flex;
              justify-content: center;
              width: 100%;
              height: fit-content;
              gap: 20px;
            `}
          >
            <div
              id='drop layout'
              ref={drop}
              css={css`
                box-sizing: border-box;
                width: 280px;
                min-height: 140px;
                height: fit-content;
                padding: 18px 25px 25px;

                font-weight: 300;
                font-size: 15px;
                line-height: 24px;

                background: #ffffff;
                border: 1px solid #e9e9e9;
                // box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                border-radius: 15px;
                color: ${colors.black};
              `}
            >
              I got stress when{' '}
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

                        color: ${colors.black};
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

                width: 430px;
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
                  gap: 8px;
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
          <div
            css={css`
              box-sizing: border-box;
              width: 360px;
              min-height: 100px;
              height: fit-content;
              padding: 18px 25px 25px;
              display: flex;
              justify-content: flex-end;
              align-self: flex-end;
              font-weight: 300;
              font-size: 15px;
              line-height: 24px;

              background: ${colors.black};
              border: 1px solid #e9e9e9;
              // box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
              border-radius: 15px;
              color: white;
            `}
          >
            you can
          </div>
        </div>
      </div>
      {/* guide page */}
      <div
        css={css`
          position: fixed;
          display: ${isGuideOn ? `flex` : `none`};
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
        `}
      >
        hi
      </div>
      <GuideBtn
        isGuideOn={isGuideOn}
        onClickHandler={() => setIsGuideOn(!isGuideOn)}
      />
    </div>
  );
}

export default Recommend;
