import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';

type LowerThirdProps = {
  text: string;
  subtext: string;
  startSecond: number;
  endSecond: number;
};

const RED = '#e63329';

export const LowerThird: React.FC<LowerThirdProps> = ({
  text,
  subtext,
  startSecond,
  endSecond,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = Math.round(startSecond * fps);
  const endFrame = Math.round(endSecond * fps);
  const localFrame = frame - startFrame;
  const totalDuration = endFrame - startFrame;

  if (localFrame < 0 || localFrame > totalDuration) return null;

  const slideIn = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
  });
  const slideOut = spring({
    frame: localFrame - (totalDuration - 20),
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
  });

  const translateX =
    interpolate(slideIn, [0, 1], [-700, 0]) +
    interpolate(slideOut, [0, 1], [0, -700]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: 220,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          transform: `translateX(${translateX}px)`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: 8,
            flexShrink: 0,
            background: RED,
            boxShadow: `0 0 16px ${RED}`,
          }}
        />
        <div
          style={{
            background: 'rgba(0,0,0,0.78)',
            backdropFilter: 'blur(4px)',
            paddingTop: 18,
            paddingBottom: 18,
            paddingLeft: 24,
            paddingRight: 48,
          }}
        >
          <div
            style={{
              color: 'white',
              fontWeight: 900,
              fontSize: 52,
              fontFamily: 'Arial Black, Arial, sans-serif',
              lineHeight: 1.1,
              letterSpacing: -0.5,
            }}
          >
            {text}
          </div>
          <div
            style={{
              color: '#aaa',
              fontWeight: 400,
              fontSize: 32,
              fontFamily: 'Arial, sans-serif',
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            {subtext}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
