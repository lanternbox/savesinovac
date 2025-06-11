"use client";

import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import _styles from "./HomeResourcesDs.module.css";
import { formatDate } from "@/utils/formatDate";
import { processFieldContent } from "@/utils/processFieldContent";
export function Client({
  as: _Component = _Builtin.Section,
  block,
  locale,
  items,
}) {
  const content = block;
  return (
    <_Component
      className={_utils.cx(_styles, "section", "homepage-resources")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "container-large")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "important-material-box-home")}
          tag="div"
        >
          <_Builtin.Heading
            className={_utils.cx(_styles, "text-align-center", "mb-3")}
            tag="h2"
          >
            {content?.["heading"]}
          </_Builtin.Heading>
          <_Builtin.Block className={_utils.cx(_styles, "resources")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "resource-wrapper")}
              tag="div"
            >
              {items.docs.map((item, index) => (
                <React.Fragment key={item.id || index}>
                  <>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "press-item")}
                      tag="div"
                      fieldname="resources"
                      sort=""
                      id="dynamic-item"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "resource-item")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "resource-item-left")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "resoure-image-icon")}
                            tag="div"
                          >
                            <_Builtin.Link
                              button={false}
                              block="inline"
                              options={{
                                href: `/collection/${item["slug"]}`,
                              }}
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "resource-icon",
                                  "invert",
                                )}
                                width="auto"
                                height="auto"
                                loading="lazy"
                                alt="Press Releases"
                                src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917ab86_press.png"
                              />
                            </_Builtin.Link>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "resource-item-right")}
                          tag="div"
                        >
                          <_Builtin.Link
                            className={_utils.cx(_styles, "resource-link")}
                            button={false}
                            block="inline"
                            options={{
                              href: `/collection/${item["slug"]}`,
                            }}
                          >
                            <_Builtin.Heading
                              className={_utils.cx(_styles, "resource-heading")}
                              tag="h6"
                            >
                              {processFieldContent("name", item, locale)}
                            </_Builtin.Heading>
                          </_Builtin.Link>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "flex-resources")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "resource-details")}
                              tag="div"
                            >
                              {processFieldContent("date", item, locale)}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "resource-details")}
                              tag="div"
                            >
                              {processFieldContent("/ ", item, locale)}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "resource-details")}
                              tag="div"
                            >
                              {processFieldContent("source", item, locale)}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "resource-flex",
                              "pt-1",
                              "hidden",
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {processFieldContent(
                                "This is some text inside of a div block.",
                                item,
                                locale,
                              )}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </>
                </React.Fragment>
              ))}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
