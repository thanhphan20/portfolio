import { getPageContent, getPageBySlug, notionClient } from "@/lib/notion";
import { NotionRenderer } from "@notion-render/client";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import cheerio from "cheerio";
import Image from "next/image";

//Plugins
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPageBySlug(params.slug);
  //Redirect to not found page!
  if (!post) notFound();

  const content = await getPageContent(post.id);

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  notionRenderer.use(hljsPlugin({}));
  notionRenderer.use(bookmarkPlugin(undefined));
  const html = await notionRenderer.render(...content);
  const formattedDate = format(new Date(post.last_edited_time), "do MMMM yyyy");

  const $ = cheerio.load(html);
  // Select all h1 and h2 tags
  $("h1, h2").each((index, element) => {
    // Get the text content of the header
    const headerText = $(element).text().trim();
    // Replace any special characters and spaces with hyphens for use in an id attribute
    const id = headerText
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/g, "")
      .replace(/\s+/g, "-");
    // Add the id attribute to the header tag
    $(element).attr("id", id);
  });

  // Convert the cheerio instance back to HTML
  const updatedHtml = $.html();
  const headers = $("h1, h2")
    .toArray()
    .map((header) => ({
      id: $(header).attr("id"),
      text: $(header).text(),
      tagName: header.tagName,
    }));

  return (
    <main className="flex flex-col justify-center px-[10%]">
      <div className="pb-4 dark:border-gray-600">
        <figure className="relative rounded shadow dark:shadow-none overflow-hidden h-96 w-full max-h-96 max-w-full">
          <Image
            src={post.cover.external.url}
            alt={params.slug}
            fill
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover"
          />
        </figure>

        <h1 className="my-4 text-5xl">
          {(post.properties.Name as any).title[0].plain_text}
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Written on {formattedDate} by Carter Phan.
        </p>
        <div className="mt-6 flex items-center justify-start gap-2 text-sm font-medium text-white dark:text-gray-300">
          <div className="flex items-center gap-1">
            {post.properties.Technology.multi_select.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 rounded-full text-white bg-gray-800"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <hr className="dark:border-gray-600"></hr>
      <section className="flex flex-row gap-12">
        <article
          className="text-xl leading-10 prose prose-p:text-white prose-headings:text-white mdx prose mt-4 w-full transition-colors dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: updatedHtml }}
        ></article>
        <aside className="py-4">
          <div className="sticky top-36">
            <TableOfContents headers={headers} />
          </div>
        </aside>
      </section>
    </main>
  );
}

const TableOfContents = ({
  headers,
}: {
  headers: Array<{ id: string; text: string; tagName: string }>;
}) => {
  return (
    <div
      id="toc-container"
      className="hidden max-h-[calc(100vh-9rem-113px)] overflow-auto pb-4 lg:block"
    >
      <h3 className="text-gray-900 dark:text-gray-100 md:text-xl">
        Table of Contents
      </h3>
      <div className="mt-4 flex flex-col space-y-2 text-sm">
        {headers.map((header) => (
          <a
            key={header.id}
            id={`link-${header.id}`}
            className={`font-medium ml-${
              header.tagName === "h1" ? "0" : "4"
            } hover:text-gray-700 focus:outline-none dark:hover:text-gray-200 focus-visible:text-gray-700 dark:focus-visible:text-gray-200 text-gray-900 dark:text-gray-100`}
            href={`#${header.id}`}
          >
            {header.text}
          </a>
        ))}
      </div>
    </div>
  );
};
