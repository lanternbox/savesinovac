"use client";

import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import _styles from "./HomeHeader.module.css";

const cx = (...args) => _utils.cx(_styles, ...args);

export function Client({ block }) {
  return (
    <section className={cx("hero", "left-right-main")}>
      <div className={cx("hero-wrapper", "main-hero")}>
        <div className={cx("hero-half", "left", "red")}>
          <h1 className={cx("hero-h1-homepage")}>{block?.heading}</h1>
          <div className={cx("dna-wrap", "new")}>
            <_Builtin.Image
              className={cx("dna-image")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              image={block?.image}
            />
          </div>
          <div className={cx("hero_content")}>
            <p className={cx("home-hero-paragraph", "text-align-center")}>
              {block?.paragraph}
            </p>
          </div>
          <div className={cx("button-group-2-up", "zero-gap-at-mobile")}>
            <div className={cx("btn-with-icon", "white")}>
              <div
                className={cx("flex-align-justify-center", "button-with-icon")}
              >
                <div className={cx("btn-text")}>
                  {"Read Our Shareholder Letter"}
                </div>
                <_Builtin.HtmlEmbed
                  className={cx("icon-1x1-regular")}
                  value="%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%2016L16%2012M16%2012L12%208M16%2012H8M22%2012C22%2017.5228%2017.5228%2022%2012%2022C6.47715%2022%202%2017.5228%202%2012C2%206.47715%206.47715%202%2012%202C17.5228%202%2022%206.47715%2022%2012Z%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("hero-half", "responsive-image")} />
      </div>
    </section>
  );
}
