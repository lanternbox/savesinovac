"use client";

import React from "react";
import { _interactionsData } from "./interactions.js";
import * as _Builtin from "@/devlink/_Builtin";
import * as _interactions from "@/devlink/interactions";
import * as _utils from "@/devlink/utils";
import _styles from "./HomeBlocksDs.module.css";
import { formatDate } from "@/utils/formatDate";
import { processFieldContent } from "@/utils/processFieldContent";
export function Client({
  as: _Component = _Builtin.Section,
  block,
  locale,
  items,
}) {
  const content = block;
  _interactions.useInteractions(_interactionsData, _styles);
  return (
    <_Component
      className={_utils.cx(_styles, "section")}
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
          className={_utils.cx(_styles, "home-flex-spacing-centered")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "subhero-max-width")}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "home-h2", "big")}
              tag="h2"
            >
              {content?.["heading"]}
            </_Builtin.Heading>
            <_Builtin.Heading
              className={_utils.cx(_styles, "home-h3")}
              tag="h3"
            >
              {content?.["heading-2"]}
            </_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "_2-up-grid", "home-blocks")}
            tag="div"
          >
            {items.docs.map((item, index) => (
              <React.Fragment key={item.id || index}>
                <>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "homepage-blocks",
                      "w-node-_835164b7-0fa1-563c-5b91-f32da4ef5e5f-a4ef5e55",
                    )}
                    id={_utils.cx(_styles, "dynamic-item")}
                    tag="div"
                    fieldname="homepage-blocks"
                    sort="order"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "card-colored")}
                      tag="div"
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "earmark")}
                        width="auto"
                        height="auto"
                        loading="lazy"
                        alt=""
                        src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917ab30_accept.png"
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "card-inner-flex")}
                        tag="div"
                      >
                        <_Builtin.Heading
                          className={_utils.cx(
                            _styles,
                            "card-color-heading-h3",
                          )}
                          tag="h3"
                        >
                          {processFieldContent("Headline", item, locale)}
                        </_Builtin.Heading>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "dividing-line")}
                          tag="div"
                        />
                        <_Builtin.RichText
                          className={_utils.cx(_styles, "card-color-paragraph")}
                          tag="div"
                          slot=""
                        >
                          {processFieldContent("Block Copy", item, locale)}
                        </_Builtin.RichText>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "card-button-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Link
                          className={_utils.cx(_styles, "btn-with-icon")}
                          data-w-id="835164b7-0fa1-563c-5b91-f32da4ef5e69"
                          button={false}
                          block="inline"
                          options={{
                            href: `/collection/${item["slug"]}`,
                          }}
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "flex-align-justify-center",
                              "button-with-icon",
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "btn-text")}
                              tag="div"
                            >
                              {processFieldContent("learn more", item, locale)}
                            </_Builtin.Block>
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "margin-left-10",
                                "arrow-hero",
                              )}
                              loading="lazy"
                              width="20"
                              height="20"
                              alt=""
                              src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917ab08_arrow-black.png"
                            />
                          </_Builtin.Block>
                        </_Builtin.Link>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </>
              </React.Fragment>
            ))}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-align-center")}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "home-h2")}
              tag="h2"
            >
              {content?.["heading-3"]}
            </_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "_2-up-grid", "home-blocks")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "homepage-blocks")}
              id={_utils.cx(
                _styles,
                "w-node-_835164b7-0fa1-563c-5b91-f32da4ef5e72-a4ef5e55",
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "card-colored", "red")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "earmark")}
                  width="auto"
                  height="auto"
                  loading="lazy"
                  alt=""
                  src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917abba_red-x.png"
                  image={content?.["image"]}
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "card-inner-flex")}
                  tag="div"
                >
                  <_Builtin.Heading
                    className={_utils.cx(_styles, "card-color-heading-h3")}
                    tag="h3"
                  >
                    {content?.["heading-4"]}
                  </_Builtin.Heading>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dividing-line", "red")}
                    tag="div"
                  />
                  <_Builtin.RichText
                    className={_utils.cx(_styles, "card-color-paragraph")}
                    tag="div"
                    slot=""
                  >
                    {processFieldContent("body", content, locale)}
                  </_Builtin.RichText>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "card-button-wrapper")}
                  tag="div"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "btn-with-icon")}
                    data-w-id="835164b7-0fa1-563c-5b91-f32da4ef5e7d"
                    button={false}
                    block="inline"
                    options={{
                      href: content?.["link"]?.href,
                    }}
                  >
                    {content?.["link"]?.text}
                  </_Builtin.Link>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-align-center")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "dna-wrap", "new")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "dna-image", "sm", "mb-4")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917abbb_heartbeat-orange.png"
                image={content?.["image-2"]}
              />
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "home-h2")}
              tag="h2"
            >
              {content?.["heading-5"]}
            </_Builtin.Heading>
            <_Builtin.Link
              className={_utils.cx(
                _styles,
                "btn-with-icon",
                "larger",
                "mt-4",
                "hidden",
              )}
              data-w-id="835164b7-0fa1-563c-5b91-f32da4ef5e87"
              button={false}
              dyn={{
                bind: {},
              }}
              block="inline"
              options={{
                href: content?.["link-2"]?.href,
                target: "_blank",
              }}
            >
              {content?.["link-2"]?.text}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
