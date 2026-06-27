import { useEffect, useMemo, useRef, useState } from 'react';

import aboutIcon from '../assets/About.svg';
import projectsIcon from '../assets/Projects.svg';
import githubIcon from '../assets/GitHub.svg';
import contactIcon from '../assets/Contact.svg';
import backIcon from '../assets/Back.svg';
import portrait from '../assets/portrait.png';

import tcdImage from '../assets/projects/tcd.webp';
import balancedByDaylightImage from '../assets/projects/balanced-by-daylight.webp';
import portfolioV3Image from '../assets/projects/portfolio-v3.webp';

const projects = [
  {
    id: 0,
    name: 'Project TCD',
    image: tcdImage,
    description:
      'An in-development highly competitive 1-vs-1 multiplayer title with a scalable backend for matchmaking, progression, and automated ELO-based skill ratings.',
    tags: ['Unity', 'C#', 'TypeScript', 'Netcode for GameObjects', 'Bun', 'PostgreSQL', 'Railway', 'Steamworks'],
    link: 'https://youtu.be/YjZZwGeTJh4',
    writeup: [
        'Project TCD is a highly competitive 1-vs-1 multiplayer title currently in development. The game features a scalable backend architecture designed to support matchmaking, player progression, and automated ELO-based skill ratings.',
        'The project is built using Unity and C# for the client-side gameplay, while the backend leverages TypeScript, Bun, and PostgreSQL to ensure a robust and efficient server infrastructure. The game interfaces with Steamworks for player authentication (verifying the game copy via the Steamworks API and using SteamIDs as a unique player identifier for the backend to assign a JWT).',
        'The backend is hosted on Railway, providing a reliable and scalable environment for the game\'s online features. The architecture is designed to handle a large number of concurrent players, and is optimized for performance with extremely optimized database queries and highly efficient data structures.',
        'This project has been a significant undertaking, and has been in development since November 2023. I have a team of almost 40 volunteer playtesters who actively provide feedback to shape the game in a direction that is both fun and skill-based.',
        'Project TCD is my magnum opus, and I am endlessly dedicated to crafting the best competitive experience possible despite my limited resources as a solo indie developer. I believe Project TCD is a testament to my passion for game development, design, and my ability to navigate all aspects of the game development process, from gameplay programming to backend architecture and QA testing and user feedback management.'
    ]
  },
  {
    id: 1,
    name: 'Balanced by Daylight',
    image: balancedByDaylightImage,
    description:
      'A free and open-source full-stack web application that helps Dead by Daylight tournament organizers validate loadouts and enforce ruleset compliance.',
    tags: ['Node.js', 'Express', 'React', 'Pug', 'PostgreSQL', 'Open-Source', 'Full-Stack', "Free and Open-Source"],
    link: 'https://github.com/kylestarrtech/Balanced-by-Daylight',
    writeup: [
        'Balanced by Daylight is a free and open-source full-stack web application designed to assist tournament organizers in validating player loadouts and ensuring compliance with tournament rulesets within Dead by Daylight, the largest horror game in the world.',
        'This application is built using Node.js and Express for the backend, and simple Pug, CSS, and JavaScript for the frontend. Balanced by Daylight is the definitive loadout checker for official and community Dead by Daylight tournaments, and has been actively used in the largest tournaments the game has ever seen with prize pools of up to USD$20,000.',
        'The application features a robust architecture that allows tournament organizers to easily manage and validate player loadouts, and a unique Autobalancer that allows organizers to apply to show their league\'s ruleset to the application and then manage it independently without further developer intervention.',
        'Due to the open-source nature of the project, there have been several community contributions to the project, and I actively maintain and update the application to ensure it remains a valuable resource for the Dead by Daylight competitive community.',
        'Balanced by Daylight proves my ability to create full-stack web applications that are both functional and user-friendly, and demonstrates my ability to work with a group of contributors with my leadership and project management skills to create a successful open-source project.'
    ]
  },
  {
    id: 2,
    name: 'Portfolio V3',
    image: portfolioV3Image,
    description:
        'A modern, responsive, and accessible portfolio website built with React and Vite with a focus on being easy-to-navigate, accessible for all, and visually appealing.',
    tags: ['React', 'Vite', 'JavaScript', 'CSS', 'Responsive Design', 'Accessibility'],
    link: 'https://github.com/kylestarrtech/Portfolio-V3',
    writeup: [
        'This is the third iteration of my personal portfolio website, built with React and Vite. The goal of this project was to create a modern, responsive, and accessible portfolio website that effectively showcases my skills and projects.',
        'The website features a clean and intuitive design, with a focus on being easy-to-navigate and visually appealing. The layout is responsive, ensuring that the website looks great on all devices.',
        'Accessibility was a key consideration in the design and development of this website. I have implemented best practices for web accessibility, including ARIA roles, keyboard navigation, and enhanced contrast for readability.'
    ]
  }
];

const aboutCopy = [
  'Hello bonjour 👋! My name is Kyle Starr; a passionate game developer from Ottawa, Ontario!',
  'I have experience in a large variety of aspects of the game development process with a particular expertise in gameplay programming. Notably, I have several years of experience in full-stack multiplayer gameplay programming with both dedicated server and peer-to-peer workflows.',
  'I run my own solo indie studio called StellarCode, with a flagship competitive experience actively in development since November 2023! The project features a team of almost 40 volunteer playtesters who directly organize feedback amongst one another directly to me.',
  'I have been pursuing game development for over a decade, and actively run the free and open-source Dead by Daylight website titled "Balanced by Daylight"; the definitive loadout checker designed for official and community Dead by Daylight tournaments.',
  'I have a large swath of available projects across various computer science disciplines. Interested in working with me? Let\'s get in touch!',
];

function App() {
  const transitionMs = 100; // NEEDS TO MATCH CSS THIS BREAKS IF IT DOESN'T
  const [activeView, setActiveView] = useState('home');
  const [renderedView, setRenderedView] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  const bgRef = useRef(null);

  function openProjectDetail(projectId) {
    setSelectedProjectId(projectId);
    switchView('project-detail');
  }

  function goBack() {
    if (renderedView === 'project-detail') {
        switchView('projects');
        return;
    }

    switchView('home');
  }

  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const touchStartX = useRef(null);
  const BACK_GESTURE_THRESHOLD = 75;

  useEffect(() => {
    function onKeyDown(event) {
        if (event.key === 'Escape' && renderedView !== 'home') {
            goBack();
        }
    }

    function onTouchStart(event) {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    }

    function onTouchEnd(event) {
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX ?? null;

        if (startX == null || endX == null) { return; }

        const deltaX = endX - startX;

        if (renderedView !== 'home' && deltaX > BACK_GESTURE_THRESHOLD) {
            goBack();
        }

        touchStartX.current = null;
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
    }
  }, [renderedView]);

  useEffect(() => {
    function handleMouseMove(event) {
        if (!bgRef.current) { return; }

        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;

        const shiftX = x * 10;
        const shiftY = y * 10;

        bgRef.current.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const homeActions = useMemo(
    () => [
      { label: 'About Me', icon: aboutIcon, onClick: () => switchView('about') },
      { label: 'Projects', icon: projectsIcon, onClick: () => switchView('projects') },
      { label: 'GitHub', icon: githubIcon, href: 'https://www.github.com/kylestarrtech' },
      { label: 'Contact', icon: contactIcon, href: 'mailto:kyle@kylestarr.tech' },
    ],
    [renderedView, isExiting],
  );

  function switchView(nextView) {
    if (nextView === renderedView || isExiting) { return; }

    setActiveView(nextView);
    setIsExiting(true);

    setTimeout(() => {
        setRenderedView(nextView);
        setIsExiting(false);

        setIsEntering(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setIsEntering(false));
        })
    }, transitionMs);
  }

  return (
    <div className="app-shell">
      <div className="app-background" ref={bgRef}aria-hidden="true" />
      <main className="app-main">
        <section
          className={`view-container ${activeView === renderedView ? 'view-visible' : 'view-hidden'} ${renderedView === 'home' ? 'home-view' : 'panel-view'} ${isExiting ? 'exiting' : ''} ${isEntering ? 'entering' : ''}`.trim()}
          aria-labelledby={renderedView === 'home' ? 'home-title' : renderedView === 'about' ? 'about-title' : 'projects-title'}
        >
          {renderedView === 'home' && (
            <>
              <header className="panel-header">
                <div>
                    <h2 id="home-title">KYLE STARR</h2>
                </div>
              </header>
              <div className="home-grid" role="navigation" aria-label="Portfolio sections">
                {homeActions.map((action) =>
                  action.href ? (
                    <a key={action.label} className="orb-button" href={action.href} target="_blank" rel="noreferrer">
                      <span className="orb-button__icon-wrap" aria-hidden="true">
                        <img className="orb-button__icon" src={action.icon} alt="" />
                      </span>
                      <span className="orb-button__label">{action.label}</span>
                    </a>
                  ) : (
                    <button key={action.label} className="orb-button" type="button" onClick={action.onClick}>
                      <span className="orb-button__icon-wrap" aria-hidden="true">
                        <img className="orb-button__icon" src={action.icon} alt="" />
                      </span>
                      <span className="orb-button__label">{action.label}</span>
                    </button>
                  ),
                )}
              </div>
            </>
          )}

          {renderedView === 'about' && (
            <>
              <header className="panel-header">
                <button className="back-button" type="button" onClick={() => switchView('home')} aria-label="Return to home">
                  <img src={backIcon} alt="" aria-hidden="true" />
                </button>
                <div>
                  <p className="eyebrow">About Me</p>
                  <h2 id="about-title">KYLE STARR</h2>
                </div>
              </header>

              <div className="about-layout">
                <div className="about-copy">
                  {aboutCopy.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="portrait-frame">
                  <img src={portrait} alt="Portrait of Kyle Starr" />
                </div>
              </div>
            </>
          )}

          {renderedView === 'projects' && (
            <>
              <header className="panel-header">
                <button className="back-button" type="button" onClick={() => switchView('home')} aria-label="Return to home">
                  <img src={backIcon} alt="" aria-hidden="true" />
                </button>
                <div>
                  <p className="eyebrow">Projects</p>
                  <h2 id="projects-title">KYLE STARR</h2>
                </div>
              </header>

              <div className="projects-list">
                {projects.map((project) => (
                  <article className="project-card" key={project.name}>
                    <div className="project-card__bg" aria-hidden="true">
                        <img src={project.image} alt="" />
                    </div>
                    <div className="project-card__content">
                        <div className="project-card__heading">
                        <h3>{project.name}</h3>
                        <button
                            className="project-link project-link--button"
                            type="button"
                            onClick={() => openProjectDetail(project.id)}
                            >
                                Project Details
                            </button>
                        </div>
                        <p>{project.description}</p>
                        <ul className="tag-list" aria-label={`${project.name} Tags/Skills`}>
                        {project.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                        </ul>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {renderedView === 'project-detail' && selectedProject && (
            <>
                <header className="panel-header">
                    <button className="back-button" type="button" onClick={goBack} aria-label="Return to projects">
                        <img src={backIcon} alt="" aria-hidden="true" />
                    </button>
                    <div>
                        <p className="eyebrow">Project Details</p>
                        <h2 id="project-detail-title">{selectedProject.name}</h2>
                    </div>
                </header>
                
                <div className="project-detail-layout">
                    <div className="project-detail-copy">
                        <p className="project-detail-description">{selectedProject.description}</p>

                        {selectedProject.writeup.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>

                    <aside className="project-detail-aside">
                        <h3>Technical Focus</h3>
                        <ul className="tag-list">
                            {selectedProject.tags.map((tag) => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>

                        <a className="project-link" href={selectedProject.link} target="_blank" rel="noreferrer">
                            View Project
                        </a>
                    </aside>
                </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;