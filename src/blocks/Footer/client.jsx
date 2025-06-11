"use client";

import React from "react";
import { _interactionsData } from "./interactions.js";
import * as _Builtin from "@/devlink/_Builtin";
import * as _interactions from "@/devlink/interactions";
import * as _utils from "@/devlink/utils";
import _styles from "./Footer.module.css";
import { formatDate } from "@/utils/formatDate";
import { processFieldContent } from "@/utils/processFieldContent";
export function Client({ as: _Component = _Builtin.Block, block, locale }) {
  const content = block;
  _interactions.useInteractions(_interactionsData, _styles);
  return (
    <_Component className={_utils.cx(_styles, "contact-items")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "section", "section-subfooter")}
        tag="div"
      >
        <_Builtin.BlockContainer
          className={_utils.cx(_styles, "container-large")}
          tag="div"
          grid={{
            type: "container",
          }}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "home-flex-spacing-centered")}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "footer-h3")}
              tag="h3"
            >
              {content?.["heading"]}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "contact-flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "contact-form-items-wrapper",
                  "single-item",
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "signature-form", "hidden")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "border-box-header-lined")}
                    tag="div"
                  >
                    {"For Media Inquiries"}
                  </_Builtin.Block>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "contact-text", "mb-0")}
                  >
                    {content?.["paragraph"]}
                  </_Builtin.Paragraph>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "signature-form")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_5b1d2d9d-dbca-67af-eac2-11f6070cfdea-eea1125b",
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "border-box-header-lined")}
                    tag="div"
                  >
                    {"For Media Inquiries"}
                  </_Builtin.Block>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "contact-text")}
                  >
                    {content?.["paragraph-2"]}
                  </_Builtin.Paragraph>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "border-box-header-lined",
                      "pt-2",
                    )}
                    tag="div"
                  >
                    {"Subscribe for Updates"}
                  </_Builtin.Block>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "contact-text")}
                  >
                    {content?.["paragraph-3"]}
                  </_Builtin.Paragraph>
                  <_Builtin.FormWrapper
                    className={_utils.cx(_styles, "mb-0", "_w-full")}
                    id="Save-TU"
                  >
                    <_Builtin.FormForm
                      className={_utils.cx(_styles, "form-flexxed")}
                      name="wf-form-Feedback-for-Sinovac"
                      data-name="Feedback for Sinovac"
                      method="get"
                      id="wf-form-Feedback-for-Sinovac"
                    >
                      <_Builtin.FormTextInput
                        className={_utils.cx(_styles, "ms-input")}
                        name="Full-Name"
                        maxLength={256}
                        data-name="Full Name"
                        placeholder="Full Name"
                        disabled={false}
                        type="text"
                        required={false}
                        autoFocus={false}
                        id="Full-Name"
                      />
                      <_Builtin.FormTextInput
                        className={_utils.cx(_styles, "ms-input")}
                        name="Email-Address"
                        maxLength={256}
                        data-name="Email Address"
                        placeholder="Enter Your Email"
                        disabled={false}
                        type="email"
                        required={false}
                        autoFocus={false}
                        id="Email-Address"
                      />
                      <_Builtin.FormTextarea
                        className={_utils.cx(_styles, "ms-input", "anon-form")}
                        name="Feedback-for-Sinovac"
                        maxLength={5000}
                        data-name="Feedback for Sinovac"
                        placeholder="Feedback for Sinovac (optional)"
                        required={false}
                        autoFocus={false}
                        id="Feedback-for-Sinovac"
                      />
                      <_Builtin.FormButton
                        className={_utils.cx(
                          _styles,
                          "button-submit",
                          "is-rounded",
                        )}
                        type="submit"
                        value="Submit"
                        data-wait="Please wait..."
                      />
                    </_Builtin.FormForm>
                    <_Builtin.FormSuccessMessage>
                      <_Builtin.Block tag="div">
                        {"Thank you! Your submission has been received!"}
                      </_Builtin.Block>
                    </_Builtin.FormSuccessMessage>
                    <_Builtin.FormErrorMessage>
                      <_Builtin.Block tag="div">
                        {
                          "Oops! Something went wrong while submitting the form."
                        }
                      </_Builtin.Block>
                    </_Builtin.FormErrorMessage>
                  </_Builtin.FormWrapper>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.BlockContainer>
      </_Builtin.Block>
      <_Builtin.Section
        className={_utils.cx(_styles, "section", "footer")}
        grid={{
          type: "section",
        }}
        tag="section"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large")}
          tag="div"
        >
          <_Builtin.NavbarWrapper
            className={_utils.cx(_styles, "footer-nav")}
            tag="div"
            config={{
              easing: "ease",
              easing2: "ease",
              duration: 400,
              docHeight: false,
              noScroll: false,
              animation: "default",
              collapse: "none",
            }}
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "footer-logo-link-wrap")}
              button={false}
              block="inline"
              options={{
                href: content?.["link"]?.href,
              }}
            >
              {content?.["link"]?.text}
            </_Builtin.Link>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer-nav-column", "wide")}
              id={_utils.cx(
                _styles,
                "w-node-dcab04af-199a-c1c5-8338-07c0247120f1-eea1125b",
              )}
              tag="div"
            >
              <_Builtin.Link
                className={_utils.cx(_styles, "btn-footer_nav")}
                button={false}
                block="inline"
                options={{
                  href: content?.["link-2"]?.href,
                }}
              >
                {content?.["link-2"]?.text}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "btn-footer_nav")}
                button={false}
                block="inline"
                options={{
                  href: content?.["link-3"]?.href,
                }}
              >
                {content?.["link-3"]?.text}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "btn-footer_nav")}
                button={false}
                block="inline"
                options={{
                  href: content?.["link-4"]?.href,
                }}
              >
                {content?.["link-4"]?.text}
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.NavbarWrapper>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "button-group",
              "flex-jcenter",
              "pt-3",
              "hidden",
            )}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "button-2")}
              button={true}
              block=""
              options={{
                href: content?.["link-5"]?.href,
              }}
            >
              {content?.["link-5"]?.text}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "button-2")}
              button={true}
              block=""
              options={{
                href: content?.["link-6"]?.href,
              }}
            >
              {content?.["link-6"]?.text}
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "hidden")}
            value="%3Cstyle%3E%0A%40media%20screen%20and%20(max-width%3A%20767px)%20%7B%0A%20%20.footer-logo-link-wrap%20%7B%0A%20%20%20%20width%3A%20100%25%20!important%3B%0A%20%20%7D%0A%7D%0A%3C%2Fstyle%3E"
          />
        </_Builtin.Block>
      </_Builtin.Section>
    </_Component>
  );
}
