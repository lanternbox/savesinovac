"use client";

import React from "react";
import { _interactionsData } from "./interactions.js";
import * as _Builtin from "@/devlink/_Builtin";
import * as _interactions from "@/devlink/interactions";
import * as _utils from "@/devlink/utils";
import _styles from "./HomeBlocksDs.module.css";

const cx = (...args) => _utils.cx(_styles, ...args);

export function Client({ block, items }) {
  _interactions.useInteractions(_interactionsData, _styles);
  return (
    <section className={cx("section")}>
      <div className={cx("container-large")}>
        <div className={cx("home-flex-spacing-centered")}>
          <div className={cx("subhero-max-width")}>
            <h2 className={cx("home-h2", "big")}>{block?.heading}</h2>
            <h3 className={cx("home-h3")}>{block?.["heading-2"]}</h3>
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
                      image={{
                        src: "https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917ab30_accept.png",
                      }}
                    />
                    <div className={cx("card-inner-flex")}>
                      <h3 className={cx("card-color-heading-h3")}>
                        {item?.Headline}
                      </h3>
                      <div className={cx("dividing-line")} />
                      <_Builtin.RichText
                        className={cx("card-color-paragraph")}
                        tag="div"
                      >
                        {item?.["Block Copy"]}
                      </_Builtin.RichText>
                    </div>
                    <div className={cx("card-button-wrapper")}>
                      <_Builtin.Link
                        className={cx("btn-with-icon")}
                        data-w-id="835164b7-0fa1-563c-5b91-f32da4ef5e69"
                        options={{
                          href: `/collection/${item?.slug}`,
                        }}
                      >
                        <div
                          className={cx(
                            "flex-align-justify-center",
                            "button-with-icon",
                          )}
                        >
                          <div className={cx("btn-text")}>{"learn more"}</div>
                          <_Builtin.Image
                            className={cx("margin-left-10", "arrow-hero")}
                            loading="lazy"
                            width="20"
                            height="20"
                            alt=""
                            image={{
                              src: "https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917ab08_arrow-black.png",
                            }}
                          />
                        </div>
                      </_Builtin.Link>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className={cx("text-align-center")}>
            <h2 className={cx("home-h2")}>{block?.["heading-3"]}</h2>
          </div>
          <div className={cx("_2-up-grid", "home-blocks")}>
            <div
              className={cx("homepage-blocks")}
              id={cx("w-node-_835164b7-0fa1-563c-5b91-f32da4ef5e72-a4ef5e55")}
            >
              <div className={cx("card-colored", "red")}>
                <_Builtin.Image
                  className={cx("earmark")}
                  width="auto"
                  height="auto"
                  loading="lazy"
                  alt=""
                  image={block?.image}
                />
                <div className={cx("card-inner-flex")}>
                  <h3 className={cx("card-color-heading-h3")}>
                    {block?.["heading-4"]}
                  </h3>
                  <div className={cx("dividing-line", "red")} />
                  <_Builtin.RichText
                    className={cx("card-color-paragraph")}
                    tag="div"
                  >
                    {block?.body}
                  </_Builtin.RichText>
                </div>
                <div className={cx("card-button-wrapper")}>
                  <_Builtin.Link
                    className={cx("btn-with-icon")}
                    data-w-id="835164b7-0fa1-563c-5b91-f32da4ef5e7d"
                    options={{
                      href: block?.link?.href,
                    }}
                  >
                    {block?.link?.text}
                  </_Builtin.Link>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("text-align-center")}>
            <div className={cx("dna-wrap", "new")}>
              <_Builtin.Image
                className={cx("dna-image", "sm", "mb-4")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                image={block?.["image-2"]}
              />
            </div>
            <h2 className={cx("home-h2")}>{block?.["heading-5"]}</h2>
            <_Builtin.Link
              className={cx("btn-with-icon", "larger", "mt-4", "hidden")}
              data-w-id="835164b7-0fa1-563c-5b91-f32da4ef5e87"
              options={{
                href: block?.["link-2"]?.href,
                target: "_blank",
              }}
            >
              {block?.["link-2"]?.text}
            </_Builtin.Link>
          </div>
        </div>
      </div>
    </section>
  );
}
