// import React, { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// export default function NetworkBackground() {
//   const particlesInit = useCallback(async (engine) => {
//     await loadFull(engine);
//   }, []);

//   const options = {
//     fullScreen: {
//       enable: true,
//       zIndex: -1,
//     },
//     background: {
//       color: {
//         value: "#ffffff",
//       },
//     },
//     fpsLimit: 60,
//     interactivity: {
//       detectsOn: "canvas",
//       events: {
//         onHover: {
//           enable: true,
//           mode: "repulse",
//         },
//         resize: true,
//       },
//       modes: {
//         repulse: {
//           distance: 100,
//           duration: 0.4,
//         },
//       },
//     },
//     particles: {
//       color: {
//         value: "#34d399",
//       },
//       links: {
//         color: "#34d399",
//         distance: 150,
//         enable: true,
//         opacity: 0.2,
//         width: 1,
//       },
//       collisions: {
//         enable: false,
//       },
//       move: {
//         direction: "none",
//         enable: true,
//         outModes: {
//           default: "bounce",
//         },
//         random: true,
//         speed: 1.5,
//         straight: false,
//       },
//       number: {
//         density: {
//           enable: true,
//           area: 800,
//         },
//         value: 50,
//       },
//       opacity: {
//         value: 0.3,
//       },
//       shape: {
//         type: "circle",
//       },
//       size: {
//         value: { min: 1, max: 3 },
//       },
//     },
//     detectRetina: true,
//   };

//   return <Particles id="network-bg" init={particlesInit} options={options} />;
// }
