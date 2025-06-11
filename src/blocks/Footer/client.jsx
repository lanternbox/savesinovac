"use client";

import React from "react";
import { _interactionsData } from "./interactions.js";
import * as _Builtin from "@/devlink/_Builtin";
import * as _interactions from "@/devlink/interactions";
import * as _utils from "@/devlink/utils";
import _styles from "./Footer.module.css";

const cx = (...args) => _utils.cx(_styles, ...args);

export function Client({ block }) {
  _interactions.useInteractions(_interactionsData, _styles);
  return (
    <div className={cx("contact-items")}>
      {/* <div className={cx("section", "section-subfooter")}>
        <div className={cx("container-large")}>
          <div className={cx("home-flex-spacing-centered")}>
            <h3 className={cx("footer-h3")}>{block?.heading}</h3>
            <div className={cx("contact-flex")}>
              <div className={cx("contact-form-items-wrapper", "single-item")}>
                <div className={cx("signature-form", "hidden")}>
                  <div className={cx("border-box-header-lined")}>
                    {"For Media Inquiries"}
                  </div>
                  <p className={cx("contact-text", "mb-0")}>
                    {block?.paragraph}
                  </p>
                </div>
                <div
                  className={cx("signature-form")}
                  id={cx(
                    "w-node-_5b1d2d9d-dbca-67af-eac2-11f6070cfdea-eea1125b",
                  )}
                >
                  <div className={cx("border-box-header-lined")}>
                    {"For Media Inquiries"}
                  </div>
                  <p className={cx("contact-text")}>{block?.["paragraph-2"]}</p>
                  <div className={cx("border-box-header-lined", "pt-2")}>
                    {"Subscribe for Updates"}
                  </div>
                  <p className={cx("contact-text")}>{block?.["paragraph-3"]}</p>
                  <_Builtin.FormWrapper
                    className={cx("mb-0", "_w-full")}
                    id="Save-TU"
                  >
                    <_Builtin.FormForm
                      className={cx("form-flexxed")}
                      name="wf-form-Feedback-for-Sinovac"
                      data-name="Feedback for Sinovac"
                      method="get"
                      id="wf-form-Feedback-for-Sinovac"
                    >
                      <_Builtin.FormTextInput
                        className={cx("ms-input")}
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
                        className={cx("ms-input")}
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
                        className={cx("ms-input", "anon-form")}
                        name="Feedback-for-Sinovac"
                        maxLength={5000}
                        data-name="Feedback for Sinovac"
                        placeholder="Feedback for Sinovac (optional)"
                        required={false}
                        autoFocus={false}
                        id="Feedback-for-Sinovac"
                      />
                      <_Builtin.FormButton
                        className={cx("button-submit", "is-rounded")}
                        type="submit"
                        value="Submit"
                        data-wait="Please wait..."
                      />
                    </_Builtin.FormForm>
                    <_Builtin.FormSuccessMessage>
                      <div>
                        {"Thank you! Your submission has been received!"}
                      </div>
                    </_Builtin.FormSuccessMessage>
                    <_Builtin.FormErrorMessage>
                      <div>
                        {
                          "Oops! Something went wrong while submitting the form."
                        }
                      </div>
                    </_Builtin.FormErrorMessage>
                  </_Builtin.FormWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <section className={cx("section", "footer")}>
        <div className={cx("container-large")}>
          <div className={cx("footer-nav")}>
            <_Builtin.Link
              className={cx("footer-logo-link-wrap")}
              options={{
                href: "/",
              }}
            >
              <_Builtin.Image
                className={cx("footer-logo")}
                width="auto"
                height="auto"
                loading="lazy"
                image={block?.logo}
              />
            </_Builtin.Link>
            {/* <div
              className={cx("footer-nav-column", "wide")}
              id={cx("w-node-dcab04af-199a-c1c5-8338-07c0247120f1-eea1125b")}
            >
              {block?.links?.map((link, index) => (
                <_Builtin.Link
                  key={index}
                  className={cx("btn-footer_nav")}
                  options={{
                    href: link?.href,
                  }}
                >
                  {link?.text}
                </_Builtin.Link>
              ))}
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
