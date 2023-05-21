/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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

function Analysis() {
  /* eslint-disable */
  const [isGuideOn, setIsGuideOn] = useState(false);
  const [hover, setHover] = useState<ActItem>({ name: '' });
  const [click, setClick] = useState<ActItem>({ name: '' });

  const setInitialDateRange = useRecoilCallback(({ snapshot, set }) => () => {
    const selectedRange = snapshot.getLoadable(selectedRangeAtom).getValue();
    if (selectedRange.start === undefined || selectedRange.end === undefined) {
      set(selectedRangeAtom, { start: 7, end: 14 });
    }
  });

  useLayoutEffect(() => {
    setInitialDateRange();
  }, [])

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
            <BarGraph setHover={setHover} setClick={setClick} />
          </div>
          <LineGraph hover={hover} click={click} />
        </div>
      </div>
      {/* guide page */}
      <div
        css={css`
          position: fixed;
          display: ${isGuideOn ? `flex` : `none`};
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
        `}
      >
        hi
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
