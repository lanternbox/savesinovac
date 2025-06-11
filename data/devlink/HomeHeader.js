"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./HomeHeader.module.css";

export function HomeHeader({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "hero", "left-right-main")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "hero-wrapper", "main-hero")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "hero-half", "left", "red")}
          tag="div"
        >
          <_Builtin.Heading
            className={_utils.cx(_styles, "hero-h1-homepage")}
            tag="h1"
          >
            {"It’s Time to Save Sinovac"}
          </_Builtin.Heading>
          <_Builtin.Block
            className={_utils.cx(_styles, "dna-wrap", "new")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "dna-image")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917abc1_Heartbeat.png"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "hero_content")}
            tag="div"
          >
            <_Builtin.Paragraph
              className={_utils.cx(
                _styles,
                "home-hero-paragraph",
                "text-align-center"
              )}
            >
              {
                "Sinovac’s long-term value is at serious risk under the current Board, which has undermined the Company’s stability, defied the rule of law, and ignored the best interests of shareholders."
              }
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "button-group-2-up",
              "zero-gap-at-mobile"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "btn-with-icon", "white")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "flex-align-justify-center",
                  "button-with-icon"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "btn-text")}
                  tag="div"
                >
                  {"Read Our Shareholder Letter"}
                </_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-1x1-regular")}
                  value="%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%2016L16%2012M16%2012L12%208M16%2012H8M22%2012C22%2017.5228%2017.5228%2022%2012%2022C6.47715%2022%202%2017.5228%202%2012C2%206.47715%206.47715%202%2012%202C17.5228%202%2022%206.47715%2022%2012Z%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "hero-half", "responsive-image")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  );
}
