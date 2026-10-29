import React from 'react';
import Post from './Post';
import { Check } from './Icons';
import {
  Portrait, ThesisCover, DistrictsSlide, StatSlide, VennSlide, DisciplineSlide, PathSlide,
  ProjectCard, ReelMedia, PaperCard, ListCard,
} from './Media';
import { profile, projects, disciplines, papers, awards, community, offTrail, mailto } from '../data';

const byId = Object.fromEntries(projects.map((p) => [p.id, p]));

const project = (p) => ({
  id: p.id, title: p.title, place: p.place, when: p.when, caption: p.text, tags: p.tags, details: p.details,
  media: <ProjectCard p={p} />,
});

const vennOrder = disciplines.map((d) => d.id);

const posts = [
  {
    id: 'intro', title: "Hi, I'm Kriti", place: 'Kathmandu, Nepal', pinned: true, aspect: 'aspect-[4/5]',
    media: <Portrait />,
    caption: `${profile.bio} ${profile.roles}. ${profile.from} Tap my picture for the journey, or keep scrolling for the work.`,
    tags: ['ProjectManagement', 'AI', 'SoftwareEngineering'],
    details: offTrail,
  },
  {
    id: 'thesis', title: 'MSc thesis', place: 'IOE Pulchowk Campus, Lalitpur', when: 'MSc thesis', aspect: 'aspect-[4/5]',
    slides: [
      <ThesisCover />,
      <DistrictsSlide />,
      <StatSlide value={384077} label="soil-to-fertilizer records" note="Built by an automated pipeline over the NARC/NSSRC Soil Information API and GeoTIFF raster layers." />,
      <StatSlide value={0.983} decimals={3} label="R² with Random Forest" note="Multi-output models predict 40 fertilizer targets at once." />,
      <StatSlide value={7.4} decimals={1} suffix="×" label="faster on GPU" note="XGBoost training, benchmarked against CPU." />,
    ],
    caption: "For my MSc thesis I taught a model to read Nepal's soil. A pipeline pulls from the NARC/NSSRC Soil Information API and GeoTIFF raster layers and turns maps into a nationwide table. Multi-output models then predict 40 fertilizer quantities at once. Data ages, though, so I checked the API's historic readings against 2026 field measurements and wrote down where they had drifted and needed fresh local data.",
    tags: ['MachineLearning', 'GeospatialData', 'RandomForest', 'XGBoost'],
    details: [
      'Published as a first-author paper at CANDARW 2026 (IEEE Computer Society, in press).',
      'Presented at the 8th KEC Conference on Engineering and Technology, 7 May 2026.',
    ],
  },
  {
    id: 'experience', title: 'Three disciplines, one niche', when: 'Now', aspect: 'aspect-[4/5]',
    slides: [
      ({ go, index }) => (
        <VennSlide sel={index > 0 && index <= vennOrder.length ? vennOrder[index - 1] : 'pm'} onSelect={(id) => go(vennOrder.indexOf(id) + 1)} />
      ),
      ...disciplines.map((d) => <DisciplineSlide d={d} />),
      <PathSlide />,
    ],
    caption: "Three disciplines, one overlap, and the part I've chosen to lead. The overlap is projects with close-knit AI integration. Swipe through AI/ML and software engineering to project management, my niche.",
    tags: ['ProjectManagement', 'AI', 'SoftwareEngineering'],
  },
  project(byId.derm),
  project(byId.myos),
  { ...project(byId.nerf), aspect: 'aspect-[4/5]', media: <ReelMedia p={byId.nerf} /> },
  project(byId.rag),
  {
    id: 'ieee', title: 'CANDARW 2026 paper', place: 'Ishigaki, Japan', when: 'Nov 2026', aspect: 'aspect-[4/5]',
    media: <PaperCard paper={papers[0]} dark />,
    caption: "In press with IEEE Computer Society proceedings. I'm presenting it at CANDARW 2026, the 11th International Workshop on GPU Computing and AI, in Ishigaki, Japan, 24–27 November.",
    tags: ['Research', 'IEEE', 'MachineLearning'],
  },
  project(byId.saathi),
  project(byId.text),
  {
    id: 'marks', title: 'Papers and marks', when: '2021–26', aspect: 'aspect-[4/5]',
    slides: [
      <PaperCard paper={papers[1]} />,
      <PaperCard paper={papers[2]} />,
      <ListCard kicker="Recognition" title="Awards & scholarships" rows={awards} />,
      <ListCard kicker="Community" title="Leadership & volunteering" rows={community.map((c, n) => [String(n + 1).padStart(2, '0'), c])} />,
    ],
    caption: 'Two first-author papers, plus the scholarships, awards and communities that got me here.',
    tags: ['Research', 'WomenInSTEM'],
  },
];

export default function Feed({ onAvatar }) {
  return (
    <div className="mx-auto max-w-[470px]">
      {posts.map((p) => <Post key={p.id} {...p} onAvatar={onAvatar} />)}

      <section id="contact" className="scroll-mt-16 px-6 py-12 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent text-accent">
          <Check size={30} strokeWidth={2} />
        </span>
        <h2 className="mt-4 text-xl font-semibold">You're all caught up</h2>
        <p className="mt-1 text-sm text-ink/60">That's the whole portfolio. If something caught your eye, say hello.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <a href={mailto('Hello from your portfolio')} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-paper hover:opacity-90">Send an email</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-lg bg-paper2 px-4 py-2 text-sm font-semibold hover:bg-ink/10">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-lg bg-paper2 px-4 py-2 text-sm font-semibold hover:bg-ink/10">LinkedIn</a>
        </div>
        <p className="mt-10 text-xs text-ink/40">© {new Date().getFullYear()} Kriti Nyoupane · Kathmandu, Nepal</p>
      </section>
    </div>
  );
}
