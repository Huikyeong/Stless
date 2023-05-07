/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as ArrowLeftIcon } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ClickLeftIcon } from 'assets/icons/click-left.svg';
import Header from '../components/Header';

function Recommend() {
  const selectedTagList: string[] = []; // After drop.
  const tagList: string[] = []; // Before drop.
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
          id='tag layout'
          css={css`
            width: 100%;
            height: 30%;
            display: flex;
          `}
        >
          <div
            id='drop layout'
            css={css`
              width: 312px;
              height: match-parent;
              margin: 2%;
              padding: 2%;

              font-family: 'Noto Sans';
              font-style: normal;
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
                color: ${selectedTagList.length === 0 ? '#a7a7a7' : '#ffffff'};
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
              margin-top: 2%;
              margin-bottom: 2%;
              padding: 2%;
              flex-direction: column;

              font-family: 'Noto Sans';
              font-style: normal;
              font-weight: 400;
              font-size: 8px;
              line-height: 110%;
              /* or 15px */

              display: flex;
              align-items: center;
              text-align: center;

              color: #a7a7a7;
            `}
          >
            <ClickLeftIcon />
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
              width: 558px;
              height: match-parent;
              margin: 2%;
              padding: 2%;

              background: #e9e9e9;
              border-radius: 15px;
            `}
          >
            drag layout
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
  );
}

export default Recommend;
