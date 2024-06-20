import React from "react";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { Article, getArticles } from "@/common/lib/posts";
import { AppContainer } from "../AppContainer";
import { AppLink } from "../AppLink";
import { Button } from "../elements/Button";
import { BlogCard } from "../cards/BlogCard";

interface BlogContentProps {
  post: Article;
}

interface BlogImageProps {
  image: string;
  alt?: string;
  description?: string;
}

export function BlogImage({ image, alt, description }: BlogImageProps) {
  return (
    <div className="flex flex-col">
      <img src={image} alt={alt} className="mb-1" />
      {alt && (
        <span className="font-semibold text-black text-center capitalize text-sm">
          {alt}
        </span>
      )}
      {description && (
        <span className="font-normal text-gray-600 dark:text-gray-200 text-center text-sm mt-2">
          {description}
        </span>
      )}
    </div>
  );
}

export function BlogContent({ post }: BlogContentProps) {
  const articleIndex = getArticles().findIndex(
    (article) => article.id === post.id
  );

  const prevArticle = articleIndex > 0 ? getArticles()[articleIndex - 1] : null;

  const nextArticle =
    articleIndex < getArticles().length - 1
      ? getArticles()[articleIndex + 1]
      : null;

  const moreArticles = [prevArticle, nextArticle].filter(Boolean) as Article[];

  return (
    <AppContainer>
      <div className="flex flex-col gap-32">
        <Markdown
          options={{
            overrides: {
              table: ({ children }) => (
                <table className="table-auto w-full border md:max-w-3xl mx-auto">
                  {children}
                </table>
              ),
              th: ({ children }) => (
                <th className="align-middle text-center font-bold text-black dark:text-black bg-gray-100 p-2">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="align-middle text-center text-black font-normal dark:text-white p-2">
                  {children}
                </td>
              ),
              img: ({ src, alt, title, ...props }) => {
                return (
                  <BlogImage
                    image={src}
                    alt={alt}
                    description={title}
                    {...props}
                  />
                );
              },
              h1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-black text-black dark:text-white">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl md:text-2xl font-bold text-black dark:text-white">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg md:text-lg font-bold text-black dark:text-white">
                  {children}
                </h4>
              ),
              code: ({ children }) => (
                <code className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-1">
                  {children}
                </code>
              ),
              p: ({ children }) => (
                <p className="text-black dark:text-white">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-black dark:text-white">
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-black dark:text-white underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              li: ({ children }) => (
                <li className="text-black dark:text-white">{children}</li>
              ),
            },
          }}
          className="!w-full !max-w-full prose flex flex-col gap-10"
        >
          {post?.content ?? ""}
        </Markdown>

        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            {moreArticles.length > 0 && (
              <span className="text-black font-alliance text-base md:text-xl leading-6">
                More from the team
              </span>
            )}

            <AppLink
              href="/blog"
              className="text-black font-bold font-alliance text-base ml-auto leading-6"
            >
              <Button> View all</Button>
            </AppLink>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {moreArticles.map(({ id, title, image, tldr = "" }: Article) => {
              const url = `/blog/${id}`;

              return (
                <BlogCard
                  key={id}
                  title={title}
                  image={image}
                  tldr={tldr}
                  url={url}
                />
              );
            })}
          </div>
        </div>
      </div>
    </AppContainer>
  );
}
