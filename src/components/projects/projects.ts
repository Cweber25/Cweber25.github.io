interface Technology {
  name: string;
  color: string;
}

export interface Project {
  title: string;
  description: string;
  projectLink: string;
  githubLink?: string;
  technologies: Technology[];
  imageUrl: string;
  features: string[];
}

export const projects: Project[] = [
  {
    title: "Ludum Dare 50 Game Jam",
    description: "Collaborated in a team of five to develop a game during a weekend game jam. Worked as one of two programmers alongside an artist and two sound designers. The game features unique mechanics and received positive feedback from the community.",
    projectLink: "https://ldjam.com/events/ludum-dare/50/honored-execution",
    githubLink: "https://github.com/chillprogrammer/ld-50",
    technologies: [
      { name: "JavaScript", color: "#00FF00" },
      { name: "TypeScript", color: "#178600" },
      { name: "Game Design", color: "#FF4B4B" }
    ],
    imageUrl: "/images/honoredExecution.jpg.png",
    features: [
      "Unique game mechanics centered around time manipulation",
      "Real-time physics-based gameplay and interactions",
      "Original artwork and sound design by team members",
      "Developed in 48 hours during game jam",
      "Positive community feedback and ratings"
    ]
  },
  {
    title: "Mini Sorry",
    description: "Developed a statistical simulation of a simplified Sorry board game variant. The program simulates a 14-space board game with specialized card mechanics, collecting data on game completion patterns and card usage statistics. Built to help a professor gather large-scale data for mathematical analysis.",
    projectLink: "https://github.com/Cweber25/Mini-Sorry",
    githubLink: "https://github.com/Cweber25/Mini-Sorry",
    technologies: [
      { name: "Python", color: "#3776AB" },
      { name: "Statistics", color: "#FFD43B" },
      { name: "Data Analysis", color: "#FF6B6B" }
    ],
    imageUrl: "/images/mini-sorry.jpg",
    features: [
      "Simulates a 14-space board with START and HOME positions",
      "Implements specialized deck mechanics with 13 cards (4 ones, 3 each of 2,3,4)",
      "Tracks and analyzes card usage frequency and deck shuffles",
      "Calculates statistical metrics like mean turns and standard deviation",
      "Supports configurable number of game simulations for data collection"
    ]
  },
  {
    title: "LifeLog",
    description: "Coming soon",
    projectLink: "https://github.com/Cweber25/LifeLog",
    githubLink: "https://github.com/Cweber25/LifeLog",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#339933" },
      { name: "MongoDB", color: "#47A248" }
    ],
    imageUrl: "/images/lifelog.jpg",
    features: [
      "Toming soon"
    ]
  }
]; 