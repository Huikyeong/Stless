/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as AnalysisIcon } from '../assets/icons/analysis.svg';
import { ReactComponent as ThumbsupIcon } from '../assets/icons/thumbs-up.svg';

function Header() {
  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        max-width: 1240px;
        width: 100%;
        height: 60px;
        z-index: 1;
      `}
    >
      logo
      <div
        css={css`
          display: flex;
          gap: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: flex-end;
            gap: 6px;

            padding: 10px 15px;
            border-radius: 10px 10px 0px 0px;

            background-color: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
          `}
        >
          <AnalysisIcon />
          Analysis
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: flex-end;
            gap: 6px;

            padding: 10px 15px;
            border-radius: 10px 10px 0px 0px;

            background-color: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
          `}
        >
          <ThumbsupIcon />
          Recommend
        </div>
      </div>
    </header>
  );
}

export default Header;
