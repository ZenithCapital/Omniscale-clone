import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

type TechHUDProps = {
  startSecond: number;
  endSecond: number;
};

const RED = '#e63329';

const ScanLines: React.FC<{ localFrame: number }> = ({ localFrame }) => (
  <>
    {Array.from({ length: 6 }).map((_, i) => {
      const top = (localFrame * 4 + (i * 1920) / 6) % 1920;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            top,
            left: 0,
            right: 0,
            height: 2,
            background:
              'linear-gradient(90deg, transparent, rgba(230,51,41,0.5), transparent)',
          }}
        />
      );
    })}
  </>
);

const CornerBrackets: React.FC<{ pulse: number }> = ({ pulse }) => {
  const size = 64;
  const thickness = 3;
  const glow = interpolate(pulse, [0, 1], [0.6, 1.0]);
  const base: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    borderColor: RED,
    borderStyle: 'solid',
    borderWidth: 0,
    opacity: glow,
    filter: `drop-shadow(0 0 6px ${RED})`,
  };
  return (
    <>
      <div style={{ ...base, top: 56, left: 40, borderTopWidth: thickness, borderLeftWidth: thickness }} />
      <div style={{ ...base, top: 56, right: 40, borderTopWidth: thickness, borderRightWidth: thickness }} />
      <div style={{ ...base, bottom: 56, left: 40, borderBottomWidth: thickness, borderLeftWidth: thickness }} />
      <div style={{ ...base, bottom: 56, right: 40, borderBottomWidth: thickness, borderRightWidth: thickness }} />
    </>
  );
};

const DataBlock: React.FC<{ localFrame: number; x: number; y: number; seed: number }> = ({
  localFrame,
  x,
  y,
  seed,
}) => {
  const tick = Math.floor(localFrame / 10);
  const lines = [
    `SIG: ${((seed * 7 + tick * 13) % 99).toString().padStart(2, '0')}.${seed % 9}%`,
    `LAT: ${((seed * 3 + tick * 7) % 180).toString().padStart(3, '0')}°`,
    `FREQ: ${((seed * 11 + tick * 5) % 999).toString().padStart(3, '0')} MHz`,
    `PKT: ${((seed * 17 + tick * 3) % 9999).toString().padStart(4, '0')}`,
  ];
  const opacity = interpolate(localFrame % 40, [0, 5, 35, 40], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        fontFamily: 'monospace',
        fontSize: 20,
        color: RED,
        textShadow: `0 0 8px ${RED}`,
        lineHeight: 1.7,
        letterSpacing: 2,
      }}
    >
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
};

export const TechHUD: React.FC<TechHUDProps> = ({ startSecond, endSecond }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = Math.round(startSecond * fps);
  const endFrame = Math.round(endSecond * fps);
  const localFrame = frame - startFrame;
  const totalDuration = endFrame - startFrame;

  if (localFrame < 0 || localFrame > totalDuration) return null;

  const masterOpacity = Math.min(
    interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
    interpolate(localFrame, [totalDuration - 15, totalDuration], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const pulse = spring({
    frame: localFrame % 45,
    fps,
    config: { damping: 8, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ opacity: masterOpacity }}>
      <AbsoluteFill
        style={{
          opacity: 0.06,
          backgroundImage: [
            'linear-gradient(rgba(230,51,41,0.6) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(230,51,41,0.6) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px',
        }}
      />
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <ScanLines localFrame={localFrame} />
      </AbsoluteFill>
      <CornerBrackets pulse={pulse} />
      <DataBlock localFrame={localFrame} x={52} y={160} seed={3} />
      <DataBlock localFrame={localFrame} x={52} y={1560} seed={7} />
      <DataBlock localFrame={localFrame} x={680} y={160} seed={11} />
    </AbsoluteFill>
  );
};
