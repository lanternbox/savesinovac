"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./HomeBlocksDs.module.css";

const _interactionsData = JSON.parse(
  '{"events":{},"actionLists":{},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function HomeBlocksDs({ as: _Component = _Builtin.Section }) {
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
              {
                "Supporting SAIF's slate is essential for the future success of Sinovac"
              }
              <br />
            </_Builtin.Heading>
            <_Builtin.Heading
              className={_utils.cx(_styles, "home-h3")}
              tag="h3"
            >
              {
                "SAIF’s candidates, if elected, intend to take the following value-enhancing actions:"
              }
            </_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "_2-up-grid", "home-blocks")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "homepage-blocks",
                "w-node-_835164b7-0fa1-563c-5b91-f32da4ef5e5f-a4ef5e55"
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
                    className={_utils.cx(_styles, "card-color-heading-h3")}
                    tag="h3"
                  >
                    {"Headline"}
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
                    {"Block Copy"}
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
                      href: "/value-creation",
                    }}
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
                        {"learn more"}
                      </_Builtin.Block>
                      <_Builtin.Image
                        className={_utils.cx(
                          _styles,
                          "margin-left-10",
                          "arrow-hero"
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
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-align-center")}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "home-h2")}
              tag="h2"
            >
              {
                "The current Sinovac Board, in contrast, has led the Company down a value-destructive path:"
              }
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
                "w-node-_835164b7-0fa1-563c-5b91-f32da4ef5e72-a4ef5e55"
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
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "card-inner-flex")}
                  tag="div"
                >
                  <_Builtin.Heading
                    className={_utils.cx(_styles, "card-color-heading-h3")}
                    tag="h3"
                  >
                    {"Heading"}
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
                    <_Builtin.Paragraph>{"Block Copy"}</_Builtin.Paragraph>
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
                      href: "/value-creation",
                    }}
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
                        {"learn more"}
                      </_Builtin.Block>
                      <_Builtin.Image
                        className={_utils.cx(
                          _styles,
                          "margin-left-10",
                          "arrow-hero"
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
              />
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "home-h2")}
              tag="h2"
            >
              {
                "Prime Success urges shareholders to wait for and read SAIF’s proxy materials before voting for the Special Meeting."
              }
            </_Builtin.Heading>
            <_Builtin.Link
              className={_utils.cx(
                _styles,
                "btn-with-icon",
                "larger",
                "mt-4",
                "hidden"
              )}
              data-w-id="835164b7-0fa1-563c-5b91-f32da4ef5e87"
              button={false}
              dyn={{
                bind: {},
              }}
              block="inline"
              options={{
                href: "/how-to-vote",
                target: "_blank",
              }}
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
                  dyn={{
                    bind: {},
                  }}
                  tag="div"
                >
                  {"How TO Vote"}
                </_Builtin.Block>
                <_Builtin.Image
                  className={_utils.cx(_styles, "margin-left-10")}
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
      </_Builtin.BlockContainer>
    </_Component>
  );
}
