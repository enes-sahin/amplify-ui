import { customComponents } from "@/components/customComponents";
import { Layout } from "@/components/Layout";
import { theme } from "@aws-amplify/ui-react";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

export default function Content({ frontmatter, mdxSource }) {
  return (
    <Layout title={frontmatter.title}>
      <MDXRemote
        {...mdxSource}
        scope={{
          theme,
          customComponents,
        }}
      />
    </Layout>
  );
}

// https://nextjs.org/docs/messages/invalid-getstaticpaths-value
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // TODO Get all content for static export
    paths: ["/"],
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking for development
    fallback: "blocking",
  };
};

// https://nextjs.org/docs/basic-features/data-fetching
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slugs = [] } = params;
  const slug = [].concat(slugs).join(path.sep);

  const contentPath = path.join(
    process.cwd(),
    "src",
    "content",
    slug,
    "index.mdx"
  );

  const source = await readFile(contentPath, "utf8");
  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require("remark-slug"),
        [
          require("remark-autolink-headings"),
          {
            linkProperties: {
              className: ["anchor"],
            },
          },
        ],
        require("remark-code-titles"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    props: {
      frontmatter: {
        ...data,
        slug,
      },
      mdxSource,
    },
  };
};
