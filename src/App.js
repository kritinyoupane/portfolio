import React from 'react';
import Nav from './components/Nav';
import AltMeter from './components/AltMeter';
import Hero from './components/Hero';
import Trail from './components/Trail';
import Dataset from './components/Dataset';
import Projects from './components/Projects';
import Experiences from './components/Experiences';
import Papers from './components/Papers';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Nav />
      <AltMeter />
      <main>
        <Hero />
        <Trail />
        <Dataset />
        <Projects />
        <Experiences />
        <Papers />
      </main>
      <Contact />
    </>
  );
}
