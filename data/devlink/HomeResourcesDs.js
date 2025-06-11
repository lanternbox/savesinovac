"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./HomeResourcesDs.module.css";

export function HomeResourcesDs({ as: _Component = _Builtin.Section }) {
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
            {"ADDITIONAL MATERIALS"}
          </_Builtin.Heading>
          <_Builtin.Block className={_utils.cx(_styles, "resources")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "resource-wrapper")}
              tag="div"
            >
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
                          href: "#",
                        }}
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "resource-icon",
                            "invert"
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
                        href: "#",
                      }}
                    >
                      <_Builtin.Heading
                        className={_utils.cx(_styles, "resource-heading")}
                        tag="h6"
                      >
                        {"name"}
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
                        {"date"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "resource-details")}
                        tag="div"
                      >
                        {"/ "}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "resource-details")}
                        tag="div"
                      >
                        {"source"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "resource-flex",
                        "pt-1",
                        "hidden"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block tag="div">
                        {"This is some text inside of a div block."}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
