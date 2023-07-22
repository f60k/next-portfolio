import { log } from "console";
import Link from "next/link";

import { getAllBlogs, blogsPerPage } from "../../../utils/mdQueries";

import Image from "next/image";
import Pagination from "@/app/components/pagination";

const Blog = async (props) => {
  const { blogs, numberPages } = await getAllBlogs();

  const currentPage = props.params.pagination;
  
  const limitedBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Blog</h1>
        {limitedBlogs.map((blog, index) => (
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
      <Pagination numberPages={numberPages} />
    </div>
  );
};

export default Blog;

export async function generateStaticParams() {
  const { numberPages } = await getAllBlogs();

  let paths = [];
  Array.from({ length: numberPages }).map((_, index) =>
    paths.push(`/blog/page/${index + 2}`)
  );

  return paths;
}
