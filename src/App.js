import React, { useCallback, useState } from 'react';
import { SideNav, TopBar, BottomBar } from './components/Shell';
import Stories from './components/Stories';
import StoryViewer from './components/StoryViewer';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import { useStored } from './hooks';

export default function App() {
  const [story, setStory] = useState(null);
  const [seen, setSeen] = useStored('seen-stories', []);
  const journey = useCallback(() => setStory(0), []);
  const close = useCallback(() => setStory(null), []);
  const markSeen = useCallback((id) => setSeen((s) => (s.includes(id) ? s : [...s, id])), [setSeen]);

  return (
    <>
      <SideNav onJourney={journey} />
      <TopBar />
      <div id="top" className="pt-14 pb-16 md:pt-6 md:pb-0 md:pl-[72px] xl:pl-[244px]">
        <div className="flex justify-center gap-16">
          <main className="w-full min-w-0 max-w-[630px]">
            <Stories seen={seen} onOpen={setStory} />
            <Feed onAvatar={journey} />
          </main>
          <Sidebar />
        </div>
      </div>
      <BottomBar onJourney={journey} />
      {story !== null && <StoryViewer start={story} onClose={close} onSeen={markSeen} />}
      <Toast />
    </>
  );
}
