/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from 'utils/style';
import { ReactComponent as Logo } from '../assets/icons/stless.svg';

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
        align-items: center;

        flex-shrink: 0;
        max-width: 1040px;
        width: 100%;
        height: 40px;
        padding-top: 30px;
      `}
    >
      <Logo
        css={css`
          width: 100px;
        `}
      />
      <div
        css={css`
          display: flex;
          gap: 10px;
          height: 32px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 7px;

            padding: 0px 15px;
            border-radius: 30px;

            background: ${location.pathname === '/analysis'
              ? colors.black
              : '#f5f5f5'};
            color: ${location.pathname === '/analysis'
              ? 'white'
              : colors.black};
            font-weight: 500;
            font-size: 13px;
            opacity: ${location.pathname === '/analysis' ? 1 : 0.3};
            &: hover {
              opacity: ${location.pathname === '/analysis' ? 1 : 0.7};
            }
            cursor: pointer;
            transition: all 0.2s;
          `}
          onClick={onAnalysisTabClick}
        >
          Analysis
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 7px;

            padding: 0px 15px;
            border-radius: 30px;

            background: ${location.pathname === '/recommend'
              ? colors.black
              : '#f5f5f5'};
            color: ${location.pathname === '/recommend'
              ? 'white'
              : colors.black};
            font-weight: 500;
            font-size: 13px;
            opacity: ${location.pathname === '/recommend' ? 1 : 0.3};
            &: hover {
              opacity: ${location.pathname === '/recommend' ? 1 : 0.7};
            }
            cursor: pointer;
            transition: all 0.15s;
          `}
          onClick={onRecommendTabClick}
        >
          Recommend
        </div>
      </div>
    </header>
  );
}

export default Header;
