const { default: Link } = require("next/link");

const Footer = () => {
  return (
    <footer>
      <div>
        <a href="/">
          <img src="/images/github.svg" />
        </a>
        <hr />
        <Link href="/blog">BLOG</Link>
        <Link href="/contact">Contact</Link>
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
