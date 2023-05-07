/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as AnalysisIcon } from '../assets/icons/analysis.svg';
import { ReactComponent as Logo } from '../assets/icons/stless.svg';
import { ReactComponent as ThumbsupIcon } from '../assets/icons/thumbs-up.svg';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const onAnalysisTabClick = () => {
    navigate('/analysis');
  };
  const onRecommendTabClick = () => {
    navigate('/recommend');
  };
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
      <Logo
        css={css`
          color: #000000;
          font-size: 3.6rem;
          font-weight: 800;
          margin: auto;
          margin-left: 10px;
        `}
      />
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
            opacity: ${location.pathname === '/analysis' ? 1 : 0.2};
            cursor: pointer;
          `}
          onClick={onAnalysisTabClick}
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
            opacity: ${location.pathname === '/analysis' ? 0.2 : 1};
            cursor: pointer;
          `}
          onClick={onRecommendTabClick}
        >
          <ThumbsupIcon />
          Recommend
        </div>
      </div>
    </header>
  );
}

export default Header;
