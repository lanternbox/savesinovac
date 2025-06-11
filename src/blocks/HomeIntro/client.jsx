"use client";

import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import _styles from "./HomeIntro.module.css";
import { formatDate } from "@/utils/formatDate";
import { processFieldContent } from "@/utils/processFieldContent";
export function Client({ as: _Component = _Builtin.Block, block, locale }) {
  const content = block;
  return (
    <_Component tag="div">
      <_Builtin.Section
        className={_utils.cx(_styles, "hero", "left-right")}
        grid={{
          type: "section",
        }}
        tag="section"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "hero-wrapper", "full-split")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "hero-half", "tall-image")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "hero-half", "right")}
            tag="div"
          >
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "home-hero-paragraph", "sm")}
            >
              {content?.["paragraph"]}
            </_Builtin.Paragraph>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Section>
      <_Builtin.Section
        className={_utils.cx(_styles, "hero", "left-right", "black")}
        grid={{
          type: "section",
        }}
        tag="section"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "hero-wrapper",
            "full-split",
            "max-width",
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "hero-half", "hero-full-width")}
            tag="div"
          >
            <_Builtin.BlockContainer
              className={_utils.cx(_styles, "container-medium")}
              grid={{
                type: "container",
              }}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "hero_content",
                  "text-align-center",
                )}
                tag="div"
              >
                <_Builtin.Paragraph
                  className={_utils.cx(_styles, "home-hero-paragraph", "sm")}
                >
                  {content?.["paragraph-2"]}
                </_Builtin.Paragraph>
              </_Builtin.Block>
            </_Builtin.BlockContainer>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Section>
    </_Component>
  );
}
