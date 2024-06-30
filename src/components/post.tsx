import React from "react";
import { format } from "date-fns";

interface PostProps {
  title: string;
  content: string;
  updated: string;
  category: [];
}

export function Post(props: PostProps) {
  const { title, content, updated, category } = props;

  const formattedDate = format(new Date(updated), "do MMMM yyyy");

  return (
    <article className="w-full mb-10 flex flex-col items-center pt-20">
      <header className="mb-4 lg:mb-6 not-format flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-6xl font-black text-white">{title}</h1>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {category.map((cat) => (
            <span
              key={cat.id}
              className="px-3 py-1 rounded-full text-white bg-gray-800"
            >
              {cat.name}
            </span>
          ))}
        </div>
        <time className="text-white">{`Updated on ${formattedDate}`}</time>
      </header>

      <div
        className="text-xl mt-4 max-w-3xl leading-10 prose prose-p:text-white prose-headings:text-white"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
}
