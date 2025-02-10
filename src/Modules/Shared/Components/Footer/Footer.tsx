import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import footerLogo from "../../../../assets/Image/sample logo 1.png";
import FooterImg from "../../../../assets/Image/FooterImg.png";
import footerStyle from "./footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#ED553B" }}
      >
        <section className={`position-relative `}>
          <div className="container p-5">
            <div className="row">
              <div className="col-md-6">
                <img src={footerLogo} alt="logoFooter" />
                <ul className="list-unstyled mb-0 ">
                  <p className={footerStyle.footerText}>
                    Nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </p>
                  <div className="me-3">
                    <FaFacebook size={30} className="cursor" />
                    <FaInstagram size={30} className="mx-3 cursor" />
                    <FaLinkedin size={30} className="cursor" />
                    <FaTwitter size={30} className="mx-3 cursor" />
                    <FaYoutube size={30} className="cursor" />
                  </div>
                </ul>
              </div>
              <div className={`col-md-3 ${footerStyle.footerColumn}`}>
                <h5>Company</h5>
                <ul className="list-unstyled mb-0 mt-4">
                  <li>
                    <Link to={""}>HOME</Link>
                  </li>
                  <li className="my-2">
                    <Link to={""}>ABOUT US</Link>
                  </li>
                  <li>
                    <Link to={""}>BOOKS </Link>
                  </li>
                  <li className="my-2">
                    <Link to={""}>NEW RELEASE</Link>
                  </li>
                  <li>
                    <Link to={""}>CONTACT US</Link>
                  </li>
                  <li className="mt-3">
                    <Link to={""}>BLOG</Link>
                  </li>
                </ul>
              </div>
              <div className={`col-md-3 ${footerStyle.footerColumn}`}>
                <h5>Importent Links</h5>
                <ul className="list-unstyled mb-0 mt-4">
                  <li>
                    <Link to={""}>Privacy Policy</Link>
                  </li>
                  <li className="my-2">
                    <Link to={""}>FAQs</Link>
                  </li>
                  <li>
                    <Link to={""}>Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${footerStyle.footerCaption}  mt-5 `}>
              <p>© 2022 Arihant. All Rights Reserved.</p>
              <p>Privacy | Terms of Service</p>
            </div>
          </div>
          <img
            src={FooterImg}
            alt="logoFooter"
            className="position-absolute bottom-0 end-0"
          />
          <img
            src={FooterImg}
            alt="logoFooter"
            className="position-absolute top-0 start-0 imgHorizontal"
          />
        </section>
      </footer>
    </>
  );
}
