"use client";

import { useState, forwardRef } from "react";

import Project from "./ui/Project/project";
import Heading from "./ui/heading";
import Modal from "./Modal/modal";

const projects = [
  {
    title: "GO Daddy",
    src: "daddy.webp",
    color: "#000000",
  },
  {
    title: "Ibbwebsite",
    src: "ibb.webp",
    color: "#8C8C8C",
  },
  {
    title: "Locomotive",
    src: "meme.webp",
    color: "#EFE8D3",
  },
  {
    title: "Silencio",
    src: "sunny.webp",
    color: "#706D63",
  },
];

const Projects = forwardRef((props, ref) => {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section
      id="projects"
      ref={ref}
      className="overflow-hidden h-screen px-[10%] flex flex-col justify-center"
    >
      <Heading title="Projects" />
      <div className="w-full flex flex-col items-center justify-center">
        {projects.map((project, index) => {
          return (
            <Project
              index={index}
              title={project.title}
              setModal={setModal}
              key={index}
            />
          );
        })}
      </div>
      <Modal modal={modal} projects={projects} />
    </section>
  );
});

export default Projects;
