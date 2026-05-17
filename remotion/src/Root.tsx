import React from 'react';
import { Composition } from 'remotion';
import { TalkingHeadCaptions } from './compositions/TalkingHeadCaptions';
import { BrollOverlay } from './compositions/BrollOverlay';
import { TechHUD } from './compositions/TechHUD';
import { PhoneMockup } from './compositions/PhoneMockup';
import { LowerThird } from './compositions/LowerThird';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="TalkingHeadCaptions"
        component={TalkingHeadCaptions}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          captionStyle: 'kinetic' as const,
          transcript: [
            { word: 'Hello', start: 0.0, end: 0.4 },
            { word: 'world,', start: 0.5, end: 0.9 },
            { word: 'this', start: 1.0, end: 1.3 },
            { word: 'is', start: 1.4, end: 1.6 },
            { word: 'Remotion', start: 1.7, end: 2.2 },
            { word: 'captions', start: 2.3, end: 2.8 },
            { word: 'powered', start: 2.9, end: 3.3 },
            { word: 'by', start: 3.4, end: 3.6 },
            { word: 'Groq.', start: 3.7, end: 4.5 },
          ],
        }}
      />

      <Composition
        id="BrollOverlay"
        component={BrollOverlay}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          brollClips: [
            {
              clipUrl:
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              startSecond: 2,
              endSecond: 5,
            },
            {
              clipUrl:
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              startSecond: 7,
              endSecond: 10,
            },
          ],
        }}
      />

      <Composition
        id="TechHUD"
        component={TechHUD}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          startSecond: 0,
          endSecond: 10,
        }}
      />

      <Composition
        id="PhoneMockup"
        component={PhoneMockup}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          screenshotUrl: 'https://placehold.co/320x650/1a1a2e/ffffff?text=App+Screenshot',
          startSecond: 0,
          endSecond: 10,
          position: 'right' as const,
        }}
      />

      <Composition
        id="LowerThird"
        component={LowerThird}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          text: 'John Smith',
          subtext: 'CEO & Founder',
          startSecond: 0,
          endSecond: 8,
        }}
      />
    </>
  );
};
