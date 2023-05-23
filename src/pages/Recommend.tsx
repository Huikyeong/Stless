/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ClickLeftIcon } from 'assets/icons/click-left.svg';
import { ReactComponent as SankeyPlaceholder } from 'assets/images/placeholder_sankey.svg';
import { ReactComponent as Guide1 } from 'assets/images/recommend-guide.svg';
import DragItem from 'components/DragItem';
import GuideBtn from 'components/GuideBtn';
import {
  SankeyDiagram,
  tagList,
  makeReleaseTagList,
  initGetTagList,
  initReleaseTagList,
} from 'components/SankeyDiagram';
import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { colors } from 'utils/style';
import Header from '../components/Header';

function Recommend() {
  const [isGuideOn, setIsGuideOn] = useState(false);
  const [selectedTagList, setSelectedTagList] =
    useState<string[]>(initGetTagList);
  const [releaseTagList, setReleaseTagList] =
    useState<string[]>(initReleaseTagList);

  useEffect(() => {
    setReleaseTagList(makeReleaseTagList(selectedTagList));
  }, [selectedTagList]);

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
          justify-content: flex-start;
          align-items: center;

          width: 100%;
          height: 100%;
          padding-top: 30px;
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
                      onClick={() => {
                        setSelectedTagList((prev) =>
                          prev.filter((selectedTag) => selectedTag !== tag),
                        );
                      }}
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
          {selectedTagList.length === 0 ? (
            <SankeyPlaceholder
              css={css`
                width: 800px;
                height: 330px;
                align-self: center;
              `}
            />
          ) : (
            <SankeyDiagram selectedTagList={selectedTagList} />
          )}
          <div
            css={css`
              box-sizing: border-box;
              height: fit-content;
              padding: 18px 25px;
              display: flex;
              flex-direction: column;
              jutify-content: flex-center;
              align-items: flex-end;
              align-self: flex-end;
              font-weight: 300;
              font-size: 15px;
              line-height: 22px;

              background: ${colors.black};
              border: 1px solid #e9e9e9;
              border-radius: 15px;
              color: white;
            `}
          >
            You will able to release stress through
            <span
              css={css`
                display: flex;
                justify-content: flex-end;
                flex-wrap: wrap;
              `}
            >
              {releaseTagList.length === 0 && '...'}
              {releaseTagList.slice(0, 4).map((tag, index) => (
                <div
                  key={tag}
                  css={css`
                    display: flex;

                    margin-right: 5px;
                  `}
                >
                  {releaseTagList.length - 1 === index &&
                    releaseTagList.length > 1 &&
                    releaseTagList.length < 4 && (
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

                      color: #ffffff;
                      font-weight: 600;
                    `}
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
                    {index === 3 ? (
                      <p
                        css={css`
                          font-weight: 400;
                        `}
                      >
                        etc
                      </p>
                    ) : (
                      <p>{tag}</p>
                    )}
                  </div>
                  {releaseTagList.length - 1 === index ? '.' : ','}
                </div>
              ))}
            </span>
          </div>
        </div>
      </div>
      {/* guide page */}
      <div
        css={css`
          box-sizing: border-box;
          position: fixed;
          display: ${isGuideOn ? `flex` : `none`};
          flex-direction: column;
          align-items: center;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
        `}
      >
        <p
          css={css`
            font-weight: 700;
            font-size: 25px;
            color: white;
            padding-top: 50px;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
              1px 1px 0 #000;
          `}
        >
          Recommend
        </p>
        <div
          css={css`
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 1040px;
          `}
        >
          <Guide1 />
        </div>
      </div>
      <GuideBtn
        isGuideOn={isGuideOn}
        onClickHandler={() => setIsGuideOn(!isGuideOn)}
      />
    </div>
  );
}

export default Recommend;
