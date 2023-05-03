/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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
          Analysis
        </div>
      </div>
    </header>
  );
}

export default Header;
