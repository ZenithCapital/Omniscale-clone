import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';

type Word = {
  word: string;
  start: number;
  end: number;
};

type TalkingHeadCaptionsProps = {
  videoUrl: string;
  transcript: Word[];
  captionStyle: 'kinetic' | 'bold';
};

const RED = '#e63329';

const captionTextStyle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 68,
  fontFamily: 'Arial Black, Arial, sans-serif',
  textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
  lineHeight: 1.1,
};

function groupIntoLines(words: Word[], size: number): Word[][] {
  const lines: Word[][] = [];
  for (let i = 0; i < words.length; i += size) {
    lines.push(words.slice(i, i + size));
  }
  return lines;
}

export const TalkingHeadCaptions: React.FC<TalkingHeadCaptionsProps> = ({
  videoUrl,
  transcript,
  captionStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const renderKinetic = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {transcript.map((w, i) => {
        const wordStartFrame = Math.round(w.start * fps);
        const springVal = spring({
          frame: frame - wordStartFrame,
          fps,
          config: { damping: 8, stiffness: 200, mass: 0.5 },
        });
        const isActive = currentTime >= w.start && currentTime <= w.end;
        return (
          <span
            key={i}
            style={{
              ...captionTextStyle,
              display: 'inline-block',
              color: isActive ? RED : 'white',
              transform: `translateY(${interpolate(springVal, [0, 1], [20, 0])}px) scale(${interpolate(springVal, [0, 1], [0.8, 1])})`,
              opacity: frame >= wordStartFrame ? 1 : 0,
              margin: '0 6px',
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );

  const renderBold = () => {
    const lines = groupIntoLines(transcript, 4);
    const activeLineIdx = lines.findIndex(
      (line) => currentTime >= line[0].start && currentTime <= line[line.length - 1].end
    );
    const displayLine = activeLineIdx >= 0 ? lines[activeLineIdx] : [];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
        {displayLine.map((w, i) => (
          <span
            key={i}
            style={{
              ...captionTextStyle,
              color: currentTime >= w.start && currentTime <= w.end ? RED : 'white',
            }}
          >
            {w.word}
          </span>
        ))}
      </div>
    );
  };

  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={videoUrl}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 120,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        {captionStyle === 'kinetic' ? renderKinetic() : renderBold()}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
