import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

type BrollClip = {
  clipUrl: string;
  startSecond: number;
  endSecond: number;
};

type BrollOverlayProps = {
  videoUrl: string;
  brollClips: BrollClip[];
};

const FADE_FRAMES = 5;

const ClipWithFade: React.FC<{ clipUrl: string; durationInFrames: number }> = ({
  clipUrl,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  return (
    <AbsoluteFill style={{ opacity }}>
      <OffthreadVideo
        src={clipUrl}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </AbsoluteFill>
  );
};

export const BrollOverlay: React.FC<BrollOverlayProps> = ({ videoUrl, brollClips }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={videoUrl}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {brollClips.map((clip, i) => {
        const startFrame = Math.round(clip.startSecond * fps);
        const clipFrames = Math.round((clip.endSecond - clip.startSecond) * fps);
        return (
          <Sequence key={i} from={startFrame} durationInFrames={clipFrames}>
            <ClipWithFade clipUrl={clip.clipUrl} durationInFrames={clipFrames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
