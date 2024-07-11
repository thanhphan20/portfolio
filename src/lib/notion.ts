import "server-only";

import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import { format } from "date-fns";

export const notionClient = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

export const getPages = cache(async () => {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Done",
          },
        },
      ],
    },
    // sorts: [
    //   {
    //     timestamp: 'last_edited_time',
    //     direction: 'descending',
    //   },
    // ],
    // start_cursor: undefined,
  });

  return response.results
    .map((page) => ({
      id: page.id,
      title: page.properties.Name.title[0].plain_text,
      summary: page.properties.Summary.rich_text[0].plain_text,
      slug: page.properties.Slug.rich_text[0].plain_text,
      techs: page.properties.Technology.multi_select,
      background: page.cover?.external.url,
      date: format(new Date(page.created_time), "do MMMM yyyy"),
    }));
});

export const getTechnologyOptions = cache(async () => {
  const response = await notionClient.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  const technologyProperty = response.properties.Technology;

  if (technologyProperty && technologyProperty.multi_select) {
    return technologyProperty.multi_select.options;
  }

  return [];
});

export const getPageContent = cache((pageId: string) => {
  return notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[]);
});

export const getPageBySlug = cache((slug: string) => {
  return notionClient.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
});
