"use client";

import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import _styles from "./HomeIntro.module.css";
import { processFieldContent } from "@/utils/processFieldContent";

const cx = (...args) => _utils.cx(_styles, ...args);

export function Client({ block, locale }) {
  return (
    <div>
      <section className={cx("hero", "left-right")}>
        <div className={cx("hero-wrapper", "full-split")}>
          <div className={cx("hero-half", "tall-image")} />
          <div className={cx("hero-half", "right")}>
            <_Builtin.RichText
              className={cx("home-hero-paragraph", "sm")}
              tag="div"
            >
              {processFieldContent("body", block, locale)}
            </_Builtin.RichText>
          </div>
        </div>
      </section>
      <section className={cx("hero", "left-right", "black")}>
        <div className={cx("hero-wrapper", "full-split", "max-width")}>
          <div className={cx("hero-half", "hero-full-width")}>
            <div className={cx("container-medium")}>
              <div className={cx("hero_content", "text-align-center")}>
                <_Builtin.RichText
                  className={cx("home-hero-paragraph", "sm")}
                  tag="div"
                >
                  {processFieldContent("body-2", block, locale)}
                </_Builtin.RichText>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
