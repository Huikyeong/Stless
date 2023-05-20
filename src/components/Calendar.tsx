/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CalendarItem from 'components/CalendarItem';
import { colors } from 'utils/style';
import stressSummary from '../assets/datas/stress_summary.json';

function Calendar(props: { className?: string }) {
  const stress = stressSummary.map((d) => d.summary);

  const dayList: Array<{ num: number; val: number | undefined } | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  for (let i = 1; i <= 31; i += 1) {
    if (i >= 7 && i <= 15) {
      const stressVal = stress[i - 7];
      dayList.push({ num: i, val: stressVal });
    } else {
      dayList.push({ num: i, val: undefined });
    }
  }

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 20px;
      `}
      className={props.className}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        `}
      >
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 260px;
            background: #ffffff;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
            border: 1px solid #ededed;
            border-radius: 15px;

            padding: 10px 15px;
          `}
        >
          <p
            css={css`
              font-weight: 800;
              font-size: 14px;
              letter-spacing: 0.05em;
              margin-bottom: 8px;
              color: ${colors.black};
            `}
          >
            MAR, 2022
          </p>
          <div
            css={css`
              display: flex;
              justify-content: space-around;
              align-items: center;
              width: 100%;
              height: 25px;
              border-bottom: 1px solid #f1f1f1;

              font-weight: 400;
              font-size: 12px;
              color: #838383;
            `}
          >
            <p>S</p>
            <p>M</p>
            <p>T</p>
            <p>W</p>
            <p>T</p>
            <p>F</p>
            <p>S</p>
          </div>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              row-gap: 1px;
              padding: 5px 0;
            `}
          >
            {dayList.map((day, index) => (
              <CalendarItem key={index} info={day} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
