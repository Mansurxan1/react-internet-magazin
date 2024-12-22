import React from "react";
import { useTranslation } from "react-i18next";

const Error404 = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="error404">
      <h2>{t("404")}</h2>
      <p>{t("not-page")}</p>
    </div>
  );
};

export default Error404;
