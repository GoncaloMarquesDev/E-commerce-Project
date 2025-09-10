import "./Footer.scss";
function Footer() {
  return (
    <footer className="footer_wrapper">
      <div className="footer">
        <div className="footer_products">
          <h6>Products</h6>
          <ul>
            <li>Web Studio</li>
            <li>DynamicBox Flex</li>
            <li>Programming Forms</li>
            <li>Integrations</li>
            <li>Command-line</li>
          </ul>
        </div>
        <div className="footer_resources">
          <h6>Resources</h6>
          <ul>
            <li>
              <a href="#">Web Studio</a>
            </li>
            <li>DynamicBox Flex</li>
            <li>Programming Forms</li>
            <li>Integrations</li>
            <li>Command-line</li>
          </ul>
        </div>
        <div className="footer_subscribe">
          <h6>Subscribe</h6>
          <p>Get the latest news and articles to your inbox every month.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
