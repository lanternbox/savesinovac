"use client";

import React from "react";
import { _interactionsData } from "./interactions.js";
import * as _Builtin from "@/devlink/_Builtin";
import * as _interactions from "@/devlink/interactions";
import * as _utils from "@/devlink/utils";
import _styles from "./HomeBlocksDs.module.css";
import { processFieldContent } from "@/utils/processFieldContent";

const cx = (...args) => _utils.cx(_styles, ...args);
const locale = "zh";

export function Client({ block, items, imageAccept, imageRedX }) {
  _interactions.useInteractions(_interactionsData, _styles);
  return (
    <section className={cx("section")}>
      <div className={cx("container-large")}>
        <div className={cx("home-flex-spacing-centered")}>
          <div className={cx("subhero-max-width")}>
            <h2 className={cx("home-h2", "big")}>{block?.heading}</h2>
            <h3 className={cx("home-h3")}>{block?.excerpt}</h3>
          </div>
          <div className={cx("_2-up-grid", "home-blocks")}>
            {items.docs.map((item, index) => (
              <React.Fragment key={item.id || index}>
                <div
                  className={cx(
                    "homepage-blocks",
                    "w-node-_835164b7-0fa1-563c-5b91-f32da4ef5e5f-a4ef5e55",
                  )}
                  id={cx("dynamic-item")}
                >
                  <div className={cx("card-colored")}>
                    <_Builtin.Image
                      className={cx("earmark")}
                      width="auto"
                      height="auto"
                      loading="lazy"
                      alt=""
                      image={imageAccept}
                    />
                    <div className={cx("card-inner-flex")}>
                      <h3 className={cx("card-color-heading-h3")}>
                        {item?.name}
                      </h3>
                      <div className={cx("dividing-line")} />
                      <_Builtin.RichText
                        className={cx("card-color-paragraph")}
                        tag="div"
                      >
                        {processFieldContent("block-copy", item, locale)}
                      </_Builtin.RichText>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className={cx("text-align-center")}>
            <h2 className={cx("home-h2")}>{block?.["excerpt-2"]}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
