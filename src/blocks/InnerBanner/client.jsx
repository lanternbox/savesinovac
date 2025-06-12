"use client";

import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import * as _styles from "./InnerBanner.module.css";

const cx = (...args) => _utils.cx(_styles, ...args);

export function Client({ block }) {
  return (
    <div className={cx("hero-page-background")}>
      <_Builtin.Image
        className={cx("hero-page-background-image")}
        src={block?.image}
      />
      <div className={cx("hero-wrapper", "page")}>
        <div className={cx("page-h1-heading")}>{block?.heading}</div>
      </div>
    </div>
  );
}
