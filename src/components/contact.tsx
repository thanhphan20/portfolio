"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState, useRef, forwardRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "@/components/ui/heading";

const Contact = forwardRef((props, ref) => {
  const heading = useRef(null);
  const body = useRef(null);
  const contactSection = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: contactSection.current,
      start: "180px bottom",
      animation: gsap
        .timeline()
        .to(
          heading.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0
        )
        .to(
          body.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0.2
        ),

      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, [contactSection]);

  return (
    <section
      id="contact"
      ref={ref}
      className="px-[10%] h-screen overflow-hidden flex flex-col justify-center"
    >
      <Heading title="Contact" />
      <div ref={contactSection} className="flex flex-row gap-12">
        <div className="w-4/5">
          <h3
            ref={heading}
            className="max-w-lg 2xl:max-w-3xl text-heading-3 2xl:text-7xl font-semibold leading-tight translate-y-10 opacity-0"
          >
            Have an awesome idea? Let&apos;s bring it to life.
          </h3>
          <form
            name="contact"
            action="/contact"
            autoComplete="off"
            className="mt-10 font-grotesk"
            method="POST"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
              <div className="relative z-0">
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 2xl:text-body-2 text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Your name
                </label>
              </div>
              <div className="relative z-0">
                <input
                  required
                  type="text"
                  name="email"
                  id="email"
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 2xl:text-body-2 text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Your email
                </label>
              </div>
              <div className="relative z-0 sm:col-span-2">
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={5}
                  className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 2xl:text-body-2 text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Your message
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-12 relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-full group"
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                Let's do it
              </span>
              <span className="absolute inset-0 border-2 border-white rounded-full"></span>
            </button>
          </form>
        </div>

        <div className="w-1/5 flex flex-col items-end gap-12 text-accent-300">
          <div className="w-full">
            <h4 className="text-body-1 2xl:text-4xl font-semibold mb-4">
              Contact Details
            </h4>
            <div className="flex flex-col text-body-2 2xl:text-3xl">
              <a
                href="mailto:thanhphandev20@gmail.com"
                className="group relative w-fit cursor-pointer"
                target="_blank"
                rel="noreferrer"
              >
                <span>hello@thanhphan</span>
                <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
              </a>
            </div>
          </div>
          <div className="w-full">
            <h4 className="text-body-1 2xl:text-4xl font-semibold mb-4">
              My Digital Spaces
            </h4>
            <div className="text-body-2 2xl:text-3xl">
              <a
                href="https://github.com/thanhphan20"
                className="flex items-center mb-4"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="mdi:github" color="#666" />
                <div className="relative">
                  <span>Github</span>
                  <span className="absolute bottom-0 left-0 h-[0.10em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/cthanhphan/"
                className="flex w-fit items-center mb-4"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="mdi:linkedin" color="#666" />
                <div className="relative">
                  <span>LinkedIn</span>
                  <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
