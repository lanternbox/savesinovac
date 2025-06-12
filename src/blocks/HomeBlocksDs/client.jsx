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

function BlockCard({ item, image, color, locale }) {
  return (
    <div
      className={cx(
        "homepage-blocks",
        "w-node-_835164b7-0fa1-563c-5b91-f32da4ef5e5f-a4ef5e55",
      )}
    >
      <div className={cx("card-colored", color)}>
        <_Builtin.Image
          className={cx("earmark")}
          width="auto"
          height="auto"
          loading="lazy"
          alt=""
          image={image}
        />
        <div className={cx("card-inner-flex")}>
          <h3 className={cx("card-color-heading-h3")}>{item?.name}</h3>
          <div className={cx("dividing-line", color)} />
          <_Builtin.RichText className={cx("card-color-paragraph")} tag="div">
            {processFieldContent("block-copy", item, locale)}
          </_Builtin.RichText>
        </div>
      </div>
    </div>
  );
}

export function Client({ block, items, imageAccept, imageRedX }) {
  _interactions.useInteractions(_interactionsData, _styles);

  const greenCheckboxItems =
    items.docs?.filter(
      (item) => item?.["show-checkbox-or-red-x"] === "Green Checkbox",
    ) || [];
  const redXItems =
    items.docs?.filter(
      (item) => item?.["show-checkbox-or-red-x"] === "Red X",
    ) || [];

  return (
    <section className={cx("section")}>
      <div className={cx("container-large")}>
        <div className={cx("home-flex-spacing-centered")}>
          <div className={cx("subhero-max-width")}>
            <h2 className={cx("home-h2", "big")}>{block?.heading}</h2>
            <h3 className={cx("home-h3")}>{block?.excerpt}</h3>
          </div>
          <div className={cx("_2-up-grid", "home-blocks")}>
            {greenCheckboxItems.map((item) => (
              <BlockCard
                key={item.id}
                item={item}
                image={imageAccept}
                locale={locale}
              />
            ))}
          </div>
          <div className={cx("text-align-center")}>
            <h2 className={cx("home-h2")}>{block?.["excerpt-2"]}</h2>
          </div>
          <div className={cx("_2-up-grid", "home-blocks")}>
            {redXItems.map((item) => (
              <BlockCard
                key={item.id}
                item={item}
                image={imageRedX}
                color="red"
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
