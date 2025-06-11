"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./Footer.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-3":{"id":"e-3","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-5","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-4"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d61becb7-cd6e-4850-7800-a6e027a1b2f2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d61becb7-cd6e-4850-7800-a6e027a1b2f2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705673505267},"e-4":{"id":"e-4","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-6","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-3"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d61becb7-cd6e-4850-7800-a6e027a1b2f2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d61becb7-cd6e-4850-7800-a6e027a1b2f2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705673505267}},"actionLists":{"a-5":{"id":"a-5","title":"Button Terciary (Hover)","actionItemGroups":[{"actionItems":[{"id":"a-5-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".btn-line","selectorGuids":["687b26d1-f49a-dcca-9c6c-05d44a5c181a"]},"xValue":-100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-5-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".btn-line","selectorGuids":["687b26d1-f49a-dcca-9c6c-05d44a5c181a"]},"xValue":0,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1635288288883},"a-6":{"id":"a-6","title":"Button Terciary (Hover Out)","actionItemGroups":[{"actionItems":[{"id":"a-6-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".btn-line","selectorGuids":["687b26d1-f49a-dcca-9c6c-05d44a5c181a"]},"xValue":100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-6-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".btn-line","selectorGuids":["687b26d1-f49a-dcca-9c6c-05d44a5c181a"]},"xValue":-100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1635288288883}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function Footer({ as: _Component = _Builtin.Block }) {
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
              {"WEWANTTOHEARFROM YOU "}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "contact-flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "contact-form-items-wrapper",
                  "single-item"
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
                    <_Builtin.Strong>
                      {"Longacre Square Partners"}
                      <br />
                    </_Builtin.Strong>
                    {"‍"}
                    <_Builtin.Link
                      button={false}
                      block=""
                      options={{
                        href: "mailto:deeptrack@longacresquare.com",
                      }}
                    >
                      {"advantech@longacresquare.com"}
                    </_Builtin.Link>
                  </_Builtin.Paragraph>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "signature-form")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_5b1d2d9d-dbca-67af-eac2-11f6070cfdea-eea1125b"
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
                    <_Builtin.Strong>
                      {"Longacre Square Partners"}
                      <br />
                    </_Builtin.Strong>
                    {"‍"}
                    <_Builtin.Link
                      button={false}
                      block=""
                      options={{
                        href: "mailto:deeptrack@longacresquare.com",
                      }}
                    >
                      {"advantech@longacresquare.com"}
                    </_Builtin.Link>
                  </_Builtin.Paragraph>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "border-box-header-lined",
                      "pt-2"
                    )}
                    tag="div"
                  >
                    {"Subscribe for Updates"}
                  </_Builtin.Block>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "contact-text")}
                  >
                    {
                      "Enter your name and email address below to receive important updates"
                    }
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
                          "is-rounded"
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
                href: "#",
              }}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "footer-logo")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917abc4_Save-Sinovac-White-Logo.png"
              />
            </_Builtin.Link>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer-nav-column", "wide")}
              id={_utils.cx(
                _styles,
                "w-node-dcab04af-199a-c1c5-8338-07c0247120f1-eea1125b"
              )}
              tag="div"
            >
              <_Builtin.Link
                className={_utils.cx(_styles, "btn-footer_nav")}
                button={false}
                block="inline"
                options={{
                  href: "/about-browning-west",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "footer-nav_text")}
                  tag="div"
                >
                  {"home"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "btn-line")}
                  tag="div"
                />
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "btn-footer_nav")}
                button={false}
                block="inline"
                options={{
                  href: "/about-browning-west",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "footer-nav_text")}
                  tag="div"
                >
                  {"Privacy Policy / Terms Of Use"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "btn-line")}
                  tag="div"
                />
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "btn-footer_nav")}
                button={false}
                block="inline"
                options={{
                  href: "/about-browning-west",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "footer-nav_text")}
                  tag="div"
                >
                  {"Disclaimer"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "btn-line")}
                  tag="div"
                />
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.NavbarWrapper>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "button-group",
              "flex-jcenter",
              "pt-3",
              "hidden"
            )}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "button-2")}
              button={true}
              block=""
              options={{
                href: "#",
              }}
            >
              {"How To Vote"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "button-2")}
              button={true}
              block=""
              options={{
                href: "#",
              }}
            >
              {"Contact us"}
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
