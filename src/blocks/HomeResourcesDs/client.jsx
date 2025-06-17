"use client";

import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import _styles from "./HomeResourcesDs.module.css";
import { processFieldContent } from "@/utils/processFieldContent";

const cx = (...args) => _utils.cx(_styles, ...args);
const locale = "zh";

export function Client({ block, items, icon }) {
  return (
    <section className={cx("section", "homepage-resources")}>
      <div className={cx("container-large")}>
        <div className={cx("important-material-box-home")}>
          <h2 className={cx("text-align-center", "mb-3")}>{block?.heading}</h2>
          <div className={cx("resources")}>
            <div className={cx("resource-wrapper")}>
              {items.docs.map((item, index) => (
                <React.Fragment key={item.id || index}>
                  <div className={cx("press-item")} id="dynamic-item">
                    <div className={cx("resource-item")}>
                      <div className={cx("resource-item-left")}>
                        <div className={cx("resoure-image-icon")}>
                          <_Builtin.Link
                            options={{
                              href:
                                item?.["news-or-material-link"] ||
                                item?.["downloadable-material-file"]?.url,
                            }}
                          >
                            <_Builtin.Image
                              className={cx("resource-icon", "invert")}
                              width="auto"
                              height="auto"
                              loading="lazy"
                              alt="Press Releases"
                              image={icon}
                            />
                          </_Builtin.Link>
                        </div>
                      </div>
                      <div className={cx("resource-item-right")}>
                        <_Builtin.Link
                          className={cx("resource-link")}
                          options={{
                            href:
                              item?.["downloadable-material-file"]?.url ||
                              item?.["news-or-material-link"],
                          }}
                        >
                          <h6 className={cx("resource-heading")}>
                            {item?.name}
                          </h6>
                        </_Builtin.Link>
                        <div className={cx("flex-resources")}>
                          <div className={cx("resource-details")}>
                            {processFieldContent(
                              "date-of-item-s-release",
                              item,
                              locale,
                            )}
                          </div>
                          <div className={cx("resource-details")}>{"/ "}</div>
                          <div className={cx("resource-details")}>
                            {item?.["source-name"]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
