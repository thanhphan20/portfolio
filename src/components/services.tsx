"use client";

import { useRef, useEffect, forwardRef } from "react";

import ServiceUi from "./ui/serviceUi";
import Heading from "./ui/heading";

import Lenis from 'lenis'


const Services = forwardRef((props, ref) => {
  const serviceUis = [
    {
      title: "my expertises.",
      description:
        "I focus on all things design and web related. With each of my services, my goal is to deliver an impactful and elevating digital experience for everyone.",
      items: ["Web Development", "Web Design", "UI/UX Design"],
    },
    {
      title: "my frontend stack.",
      description:
        "Utilizing JavaScript, TypeScript, ReactJS, and NextJS, I build interactive and responsive user interfaces that enhance user engagement and satisfaction.",
      items: ["ReactJS", "NextJS"],
    },
    {
      title: "my backend stack.",
      description:
        "In backend development, I leverage PHP, Java, Laravel, and Spring to build robust server-side applications that support complex business logic and data processing.",
      items: ["Laravel", "Spring"],
    },
    {
      title: "my cloud stack.",
      description:
        "My expertise extends to Docker for containerization, AWS and Azure for scalable cloud solutions, Kubernetes for container orchestration, and Jenkins for continuous integration and deployment.",
      items: ["Docker", "AWS", "Azure"],
    },
  ];

  useEffect( () => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  })


  return (
    <section
      ref={ref}
      id="services"
      aria-label="services"
      className="relative flex flex-col justify-center px-[10%] w-full"
    >
      <Heading title="Services" />
      {serviceUis.map((service, i) => {
        return (
          <ServiceUi
            title={service.title}
            description={service.description}
            items={service.items}
            i={i}
            length={serviceUis.length}
          />
        );
      })}
    </section>
  );
});

export default Services;
