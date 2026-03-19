/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Hero from './components/Hero';
import Story from './components/Story';
import WeddingDetails from './components/WeddingDetails';
import DressCode from './components/DressCode';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import Starfield from './components/Starfield';
import Sparkles from './components/Sparkles';
import MusicPlayer from './components/MusicPlayer';
import IntroScreen from './components/IntroScreen';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="bg-ink text-ivory min-h-screen selection:bg-gold selection:text-ink relative overflow-hidden">
      <IntroScreen hasEntered={hasEntered} onEnter={() => setHasEntered(true)} />
      
      {/* Only render the main content after entering to prevent scroll and layout issues */}
      <div className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 pointer-events-none h-screen overflow-hidden'}`}>
        <Starfield hasEntered={hasEntered} />
        <Sparkles hasEntered={hasEntered} />
        <div className="relative z-10">
          <Hero hasEntered={hasEntered} />
          <Story />
          <WeddingDetails />
          <DressCode />
          <RSVP />
          <Footer />
        </div>
        <MusicPlayer hasEntered={hasEntered} />
      </div>
    </main>
  );
}
