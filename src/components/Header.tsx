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

        flex-shrink: 0;
        max-width: 1140px;
        width: 100%;
        height: 55px;
      `}
    >
      <Logo
        css={css`
          align-self: center;
          width: 90px;
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
            align-items: center;
            gap: 7px;

            padding: 9px 15px;
            border-radius: 10px 10px 0px 0px;

            background-color: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

            font-weight: 500;
            font-size: 14px;
            opacity: ${location.pathname === '/analysis' ? 1 : 0.3};
            &: hover {
              opacity: ${location.pathname === '/analysis' ? 1 : 0.7};
            }
            cursor: pointer;
            transition: all 0.15s;
          `}
          onClick={onAnalysisTabClick}
        >
          <AnalysisIcon width={14} height={14} />
          Analysis
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 7px;

            padding: 8px 15px;
            border-radius: 10px 10px 0px 0px;

            background-color: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

            font-weight: 500;
            font-size: 14px;
            opacity: ${location.pathname === '/recommend' ? 1 : 0.3};
            &: hover {
              opacity: ${location.pathname === '/recommend' ? 1 : 0.7};
            }
            cursor: pointer;
            transition: all 0.15s;
          `}
          onClick={onRecommendTabClick}
        >
          <ThumbsupIcon width={16} height={16} />
          Recommend
        </div>
      </div>
    </header>
  );
}

export default Header;
