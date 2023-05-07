/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ClickLeftIcon } from 'assets/icons/click-left.svg';
import Header from '../components/Header';

function Recommend() {
  const selectedTagList: string[] = []; // After drop.
  const tagList: string[] = [
    'exercise',
    'in rainy day',
    'dfdsfdfdfdfdfdfdfd',
    'dfdsfdfdfdfdfdfdfd',
    'dfdsfdfdfdfdfdfdfd',
    'dfdsfdfdfdfdfdfdfd',
  ]; // Before drop.
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
              <span
                css={css`
                  color: ${selectedTagList.length === 0
                    ? '#a7a7a7'
                    : '#ffffff'};
                `}
              >
                {selectedTagList.length === 0
                  ? 'Drag here!'
                  : selectedTagList.join(', ')}
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
                {tagList.map((tag, index) => (
                  <div
                    key={index}
                    css={css`
                      display: flex;
                      justify-content: center;
                      align-items: center;

                      height: 16px;
                      padding: 5px 12px;

                      background: #ffffff;
                      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                      border-radius: 10px;

                      font-weight: 400;
                      font-size: 12px;
                    `}
                  >
                    {tag}
                  </div>
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
            sankey layout!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommend;
