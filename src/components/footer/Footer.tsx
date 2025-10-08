import "./Footer.scss";
function Footer() {
  return (
    <footer className="footer_wrapper">
      <div className="footer">
        <div className="footer_products">
          <h6>Products</h6>
          <ul>
            <li>
              {" "}
              <a href="#">Web Studio Flex</a>
            </li>
            <li>
              {" "}
              <a href="#">DynamicBox Flex Flex</a>
            </li>
            <li>
              {" "}
              <a href="#">Programming Forms</a>
            </li>
            <li>
              {" "}
              <a href="#">Integrations</a>
            </li>
            <li>
              {" "}
              <a href="#">Command-line</a>
            </li>
          </ul>
        </div>
        <div className="footer_resources">
          <h6>Resources</h6>
          <ul>
            <li>
              <a href="#">Web Studio</a>
            </li>
            <li>
              {" "}
              <a href="#">DynamicBox Flex</a>
            </li>
            <li>
              <a href="#">Programming Forms</a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">Integrations</a>
            </li>
            <li>
              {" "}
              <a href="#">Command-line</a>
            </li>
          </ul>
        </div>
        <div className="footer_subscribe">
          <h6>Subscribe</h6>
          <p>
            {" "}
            <a href="#">
              Get the latest news and articles to your inbox every month.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
