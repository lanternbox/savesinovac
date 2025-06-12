"use client";

import * as _utils from "@/devlink/utils";
import * as _styles from "./InnerPost.module.css";
import { processFieldContent } from "@/utils/processFieldContent";

const cx = (...args) => _utils.cx(_styles, ...args);

export function Client({ block, locale }) {
  return (
    <section className={cx("section", "interior-pages")}>
      <div className={cx("container-large")}>
        <div className={cx("standard-rich-text")}>
          {processFieldContent("body", block, locale)}
        </div>
      </div>
    </section>
  );
}
