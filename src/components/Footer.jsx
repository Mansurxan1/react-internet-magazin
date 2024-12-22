import React from "react";
import { useTranslation } from "react-i18next";
import { BsTelegram } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";


const Footer = () => {
    const { t, i18n } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__contact">
          <h4 className="footer__title">{t("contact")}</h4>
          <ul className="footer__list">
            <li>
              <a href="tel:+998911382094" className="footer__link">
                <BsFillTelephoneOutboundFill color="green"/>+998 91 138 20 94
              </a>
            </li>
            <li>
              <a href="mailto:paygambarqulovmp@gmail.com"  target="_blank" className="footer__link">
                <SiGmail color="#EA4335" />paygambarqulovmp@gmail.com
              </a>
            </li>
            <li>
              <a  href="https://t.me/mansurxan1"  target="_blank" className="footer__link">
                <BsTelegram color="blue" />Telegram
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__copy">
          <p>{t("reserved")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
