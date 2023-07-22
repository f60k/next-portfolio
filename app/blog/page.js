import { log } from "console";
import Link from "next/link";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

import Image from "next/image";

async function getAllBlogs() {
  const files = fs.readdirSync(path.join("data"));
  const blogs = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const fileData = fs.readFileSync(path.join("data", filename), "utf-8");
    const { data } = matter(fileData);
    return {
      frontmatter: data,
      slug: slug,
    };
  });
  const orderedBlogs = blogs.sort((a, b) => {
    return b.frontmatter.id - a.frontmatter.id;
  });
  return {
    blogs: orderedBlogs,
  };
}

const Blog = async () => {
  const { blogs } = await getAllBlogs();

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Blog</h1>
        {blogs.map((blog, index) => (
          <div key={index} className="blogCard">
            <div className="cardContainer">
              <h2>{blog.frontmatter.title}</h2>
              <p>{blog.frontmatter.excerpt}</p>
              <p>{blog.frontmatter.date}</p>
              <Link href={`/blog/${blog.slug}`}>Read more</Link>
            </div>
            <div className="blogImg">
              <Image
                src={blog.frontmatter.image}
                alt="card-image"
                width={1000}
                height={300}
                quality={90}
                priority={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
