/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as Logo } from 'assets/icons/stless.svg';
import Calendar from 'components/Calendar';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { selectedRangeAtom } from 'recoils';
import { colors } from 'utils/style';

function Onboarding() {
  const navigate = useNavigate();

  const selectedRange = useRecoilValue(selectedRangeAtom);

  const isRangeDone =
    selectedRange.start !== undefined && selectedRange.end !== undefined;

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
            align-self: center;
            width: 100px;
          `}
        />
      </header>
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
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            height: 100%;

            padding: 30px 0 50px 0;
          `}
        >
          <div
            css={css`
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            {/* step 1 */}
            {selectedRange.start === undefined && (
              <div
                css={css`
                  position: absolute;
                  right: 280px;
                  display: flex;
                  align-items: center;
                  opacity: 0.8;
                `}
              >
                <p
                  css={css`
                    box-sizing: border-box;
                    padding: 8px 15px;
                    border-radius: 5px;
                    display: flex;
                    flex-wrap: wrap;
                    text-align: center;
                    width: 200px;
                    background: black;
                    color: white;
                    font-weight: 400;
                    font-size: 12px;
                  `}
                >
                  You just select colored background date. <br />
                  First, select the start date.
                </p>
                <div
                  css={css`
                    position: relative;
                    width: 0;
                    height: 0;
                    border-bottom: 5px solid transparent;
                    border-top: 5px solid transparent;
                    border-left: 7px solid black;
                    border-right: 7px solid transparent;
                  `}
                />
              </div>
            )}
            {/* step 2 */}
            {selectedRange.start !== undefined &&
              selectedRange.end === undefined && (
                <div
                  css={css`
                    position: absolute;
                    right: 280px;
                    top: 200px;
                    display: flex;
                    align-items: center;
                    opacity: 0.8;
                  `}
                >
                  <p
                    css={css`
                      box-sizing: border-box;
                      padding: 8px 15px;
                      border-radius: 5px;
                      display: flex;
                      justify-content: center;
                      flex-wrap: wrap;
                      text-align: center;
                      width: 140px;
                      background: black;
                      color: white;
                      font-weight: 400;
                      font-size: 12px;
                    `}
                  >
                    Now, select the end date.
                  </p>
                  <div
                    css={css`
                      position: relative;
                      width: 0;
                      height: 0;
                      border-bottom: 5px solid transparent;
                      border-top: 5px solid transparent;
                      border-left: 7px solid black;
                      border-right: 7px solid transparent;
                    `}
                  />
                </div>
              )}
            <Calendar />
            <div
              css={css`
                position: absolute;
                right: -60px;
                bottom: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 3px;

                font-weight: 400;
                font-size: 14px;
                text-align: center;
                line-height: 100%;
                letter-spacing: -0.05em;
              `}
            >
              <p
                css={css`
                  margin-bottom: 10px;
                `}
              >
                low
                <br />
                stress
              </p>
              <div
                css={css`
                  width: 30px;
                  height: 30px;
                  border-radius: 100%;
                  background: ${colors.hitmap5};
                `}
              />
              <div
                css={css`
                  width: 30px;
                  height: 30px;
                  border-radius: 100%;
                  background: ${colors.hitmap4};
                `}
              />
              <div
                css={css`
                  width: 30px;
                  height: 30px;
                  border-radius: 100%;
                  background: ${colors.hitmap3};
                `}
              />
              <div
                css={css`
                  width: 30px;
                  height: 30px;
                  border-radius: 100%;
                  background: ${colors.hitmap2};
                `}
              />
              <div
                css={css`
                  width: 30px;
                  height: 30px;
                  border-radius: 100%;
                  background: ${colors.hitmap1};
                `}
              />
              <p
                css={css`
                  margin-top: 10px;
                `}
              >
                high
                <br />
                stress
              </p>
            </div>
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 30px;

                font-weight: 500;
                font-size: 16px;
                letter-spacing: -0.05em;

                ${selectedRange.start === undefined
                  ? `border-bottom: 1.5px solid #dddddd;
                color: #dddddd;`
                  : `border-bottom: 1.5px solid #838383;
                color: #838383;`}
              `}
            >
              <p>FROM</p>
              <p>{selectedRange.start && `2022.03.${selectedRange.start}`}</p>
            </div>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 30px;

                font-weight: 500;
                font-size: 16px;
                letter-spacing: -0.05em;

                ${selectedRange.end === undefined
                  ? `border-bottom: 1.5px solid #dddddd;
                color: #dddddd;`
                  : `border-bottom: 1.5px solid #838383;
                color: #838383;`}
              `}
            >
              <p>TO</p>
              <p>{selectedRange.end && `2022.03.${selectedRange.end}`}</p>
            </div>
          </div>
          <div
            css={css`
              position: relative;
              display: flex;
              align-items: center;
            `}
          >
            <button
              type='button'
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                width: 110px;
                height: 42px;
                border-radius: 10px;
                background: #444444;

                font-weight: 400;
                font-size: 16px;
                line-height: 30px;
                color: white;
                border: none;
                outline: none;
                cursor: pointer;
                &: hover {
                  opacity: 0.8;
                }
                transition: all 0.2s;
                &: disabled {
                  background: #d9d9d9;
                  cursor: default;
                  &: hover {
                    opacity: 1;
                  }
                }
              `}
              disabled={!isRangeDone}
              onClick={() => navigate('/analysis')}
            >
              Done
            </button>
            {isRangeDone && (
              <div
                css={css`
                  position: absolute;
                  left: 120px;
                  display: flex;
                  align-items: center;
                  opacity: 0.8;
                `}
              >
                <div
                  css={css`
                    position: relative;
                    width: 0;
                    height: 0;
                    border-bottom: 5px solid transparent;
                    border-top: 5px solid transparent;
                    border-left: 7px solid transparent;
                    border-right: 7px solid black;
                  `}
                />
                <p
                  css={css`
                    box-sizing: border-box;
                    padding: 8px 15px;
                    border-radius: 5px;
                    display: flex;
                    flex-wrap: wrap;
                    text-align: center;
                    width: 180px;
                    background: black;
                    color: white;
                    font-weight: 400;
                    font-size: 12px;
                    white-space: pre-line;
                  `}
                >
                  {`Nice job!\nLet's go find out more about your stress.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
