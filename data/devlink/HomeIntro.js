"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./HomeIntro.module.css";

export function HomeIntro({ as: _Component = _Builtin.Block }) {
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
              <_Builtin.Span
                className={_utils.cx(
                  _styles,
                  "text-color-orange",
                  "text-weight-bold"
                )}
              >
                {"FELLOW SHAREHOLDERS:"}
              </_Builtin.Span>
              {
                " At the upcoming July 8 Special Meeting, choose a better path for Sinovac."
              }
              <br />
              <br />
              {
                "Support SAIF Partners IV L.P.’s (“SAIF”) slate of director nominees with the investor perspective and commitment to successfully unlock the Company’s full potential value. "
              }
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
            "max-width"
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
                  "text-align-center"
                )}
                tag="div"
              >
                <_Builtin.Paragraph
                  className={_utils.cx(_styles, "home-hero-paragraph", "sm")}
                >
                  {
                    "Prime Success, L.P. is a long-term, committed investor in Sinovac. We believe boardroom change is critical to restore effective corporate governance, rebuild trust and position Sinovac for sustainable, long-term growth."
                  }
                  <br />
                </_Builtin.Paragraph>
              </_Builtin.Block>
            </_Builtin.BlockContainer>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Section>
    </_Component>
  );
}
