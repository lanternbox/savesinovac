"use client";

import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import _styles from "./HomeResourcesDs.module.css";

const cx = (...args) => _utils.cx(_styles, ...args);

export function Client({ block, items }) {
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
                              href: `/collection/${item?.slug}`,
                            }}
                          >
                            <_Builtin.Image
                              className={cx("resource-icon", "invert")}
                              width="auto"
                              height="auto"
                              loading="lazy"
                              alt="Press Releases"
                              image={{
                                src: "https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917ab86_press.png",
                              }}
                            />
                          </_Builtin.Link>
                        </div>
                      </div>
                      <div className={cx("resource-item-right")}>
                        <_Builtin.Link
                          className={cx("resource-link")}
                          options={{
                            href: `/collection/${item?.slug}`,
                          }}
                        >
                          <h6 className={cx("resource-heading")}>
                            {item?.name}
                          </h6>
                        </_Builtin.Link>
                        <div className={cx("flex-resources")}>
                          <div className={cx("resource-details")}>
                            {item?.date}
                          </div>
                          <div className={cx("resource-details")}>{"/ "}</div>
                          <div className={cx("resource-details")}>
                            {item?.source}
                          </div>
                        </div>
                        <div className={cx("resource-flex", "pt-1", "hidden")}>
                          <div>
                            {"This is some text inside of a div block."}
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
