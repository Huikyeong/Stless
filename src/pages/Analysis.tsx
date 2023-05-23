/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as ArrowLeft } from 'assets/icons/line-arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/icons/line-arrow-right.svg';
import { ReactComponent as Guide1 } from 'assets/images/analysis-guide1.svg';
import { ReactComponent as Guide2 } from 'assets/images/analysis-guide2.svg';
import BarGraph from 'components/BarGraph';
import Calendar from 'components/Calendar';
import GuideBtn from 'components/GuideBtn';
import Header from 'components/Header';
import LineGraph from 'components/LineGraph';
import { useLayoutEffect, useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { selectedRangeAtom } from 'recoils';
import { colors } from 'utils/style';

export type Activity = 'exercise' | 'study' | 'phone' | 'sleep' | '';
export type ActItem = { name: Activity; type?: 'release' | 'get' };
const guideTitleList = ['1. Calendar', '2. Bar & Line graph'];

function Analysis() {
  /* eslint-disable */
  const [isGuideOn, setIsGuideOn] = useState(false);
  const [hover, setHover] = useState<ActItem>({ name: '' });
  const [click, setClick] = useState<ActItem>({ name: '' });
  const [isGuideFirst, setIsGuideFirst] = useState(true);

  const setInitialDateRange = useRecoilCallback(({ snapshot, set }) => () => {
    const selectedRange = snapshot.getLoadable(selectedRangeAtom).getValue();
    if (selectedRange.start === undefined || selectedRange.end === undefined) {
      set(selectedRangeAtom, { start: 7, end: 14 });
    }
  });

  useLayoutEffect(() => {
    setInitialDateRange();
  }, []);

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
          align-items: center;

          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            align-items: center;
            gap: 30px;

            padding: 30px 20px 20px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 20px;
            `}
          >
            <Calendar />
            <BarGraph
              hover={hover}
              click={click}
              setHover={setHover}
              setClick={setClick}
            />
          </div>
          <LineGraph hover={hover} click={click} />
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
          Analysis: {isGuideFirst ? guideTitleList[0] : guideTitleList[1]}
        </p>

        {!isGuideFirst && (
          <div
            css={css`
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 1040px;
              height: 100%;
            `}
          >
            <ArrowLeft
              css={css`
                position: absolute;
                left: -70px;

                width: 30px;
                height: 30px;
                cursor: pointer;
                &: hover {
                  opacity: 0.7;
                }
                transition: all 0.15s;
              `}
              onClick={() => setIsGuideFirst(true)}
            />
            <Guide2 />
          </div>
        )}

        {isGuideFirst && (
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
            <ArrowRight
              css={css`
                position: absolute;
                right: -70px;
                width: 30px;
                height: 30px;
                cursor: pointer;
                &: hover {
                  opacity: 0.7;
                }
                transition: all 0.15s;
              `}
              onClick={() => setIsGuideFirst(false)}
            />
          </div>
        )}
      </div>
      {/* floating guide button */}
      <GuideBtn
        isGuideOn={isGuideOn}
        onClickHandler={() => setIsGuideOn(!isGuideOn)}
      />
    </div>
  );
}

export default Analysis;
