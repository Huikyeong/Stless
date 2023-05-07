/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from '../components/Header';
import Test from './Test';

function Recommend() {
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
        <Test />
      </div>
    </div>
  );
}

export default Recommend;
