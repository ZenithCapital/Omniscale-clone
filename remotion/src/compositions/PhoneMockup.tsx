import React from 'react';
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';

type PhoneMockupProps = {
  screenshotUrl: string;
  startSecond: number;
  endSecond: number;
  position: 'left' | 'right';
};

const PHONE_W = 320;
const PHONE_H = 650;
const RADIUS = 44;

const IPhoneFrame: React.FC<{ screenshotUrl: string }> = ({ screenshotUrl }) => (
  <div
    style={{
      width: PHONE_W,
      height: PHONE_H,
      borderRadius: RADIUS,
      background: '#1c1c1e',
      border: '3px solid #3a3a3c',
      boxShadow: '0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 10,
        borderRadius: RADIUS - 10,
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <Img src={screenshotUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>

    {/* Dynamic Island */}
    <div
      style={{
        position: 'absolute',
        top: 18,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 120,
        height: 34,
        background: '#000',
        borderRadius: 20,
        zIndex: 10,
      }}
    />

    {/* Power button */}
    <div
      style={{
        position: 'absolute',
        right: -4,
        top: 160,
        width: 4,
        height: 70,
        background: '#2c2c2e',
        borderRadius: '0 3px 3px 0',
      }}
    />

    {/* Volume buttons */}
    {([130, 190, 265] as const).map((top, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: -4,
          top,
          width: 4,
          height: i === 0 ? 40 : 60,
          background: '#2c2c2e',
          borderRadius: '3px 0 0 3px',
        }}
      />
    ))}
  </div>
);

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  screenshotUrl,
  startSecond,
  endSecond,
  position,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = Math.round(startSecond * fps);
  const endFrame = Math.round(endSecond * fps);
  const localFrame = frame - startFrame;
  const totalDuration = endFrame - startFrame;

  if (localFrame < 0 || localFrame > totalDuration) return null;

  const restX = position === 'right' ? 1080 - PHONE_W - 60 : 60;
  const offscreenOffset = position === 'right' ? 600 : -600;

  const flyIn = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 120 } });
  const flyOut = spring({
    frame: localFrame - (totalDuration - 25),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const currentX =
    restX +
    interpolate(flyIn, [0, 1], [offscreenOffset, 0]) +
    interpolate(flyOut, [0, 1], [0, offscreenOffset]);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: currentX,
          transform: 'translateY(-50%)',
        }}
      >
        <IPhoneFrame screenshotUrl={screenshotUrl} />
      </div>
    </AbsoluteFill>
  );
};
