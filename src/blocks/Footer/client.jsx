"use client";

import React from "react";
import { _interactionsData } from "./interactions.js";
import * as _Builtin from "@/devlink/_Builtin";
import * as _interactions from "@/devlink/interactions";
import * as _utils from "@/devlink/utils";
import * as _styles from "./Footer.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const cx = (...args) => _utils.cx(_styles, ...args);

// Chinese translations for hardcoded text
const translations = {
  placeholders: {
    fullName: "姓名",
    email: "请输入您的电子邮件",
    feedback: "对科兴的反馈（可选）",
  },
  submit: "提交",
  wait: "请稍候...",
  success: "谢谢！您的提交已收到！",
  error: "哎呀！提交表单时出了问题。",
};

export function Client({ block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/form1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      console.log("Form submission successful:", result);
      return true;
    } catch (error) {
      console.error("Detailed error:", {
        message: error.message,
        response: error.response,
      });
      return false;
    }
  };
  return (
    <div className={_styles.footerWrapper}>
      <div className={cx("section", "section-subfooter")}>
        <div className={cx("container-large")}>
          <div className={cx("home-flex-spacing-centered")}>
            <h3 className={cx("footer-h3")}>{block?.heading}</h3>
            <div className={cx("contact-flex")}>
              <div className={cx("contact-form-items-wrapper", "single-item")}>
                <div className={cx("signature-form", "hidden")}>
                  <div className={cx("border-box-header-lined")}>
                    {block?.subheading}
                  </div>
                  <p className={cx("contact-text", "mb-0")}>{block?.title}</p>
                  <p className={cx("contact-text", "mb-0")}>
                    <a href={`mailto:${block?.["email"]}`}>{block?.email}</a>
                  </p>
                </div>
                <div
                  className={cx("signature-form")}
                  id={cx(
                    "w-node-_5b1d2d9d-dbca-67af-eac2-11f6070cfdea-eea1125b",
                  )}
                >
                  <div className={cx("border-box-header-lined")}>
                    {block.subheading}
                  </div>
                  <p className={cx("contact-text")}>
                    <strong>{block.title}</strong>
                    <br />
                    <a href={`mailto:${block?.email}`}>{block?.email}</a>
                  </p>
                  <div className={cx("border-box-header-lined", "pt-2")}>
                    {block?.["subheading-2"]}
                  </div>
                  <p className={cx("contact-text")}>{block?.excerpt}</p>
                  <_Builtin.FormWrapper
                    className={cx("mb-0", "_w-full")}
                    id="Save-Sinovac"
                    onSubmit={handleSubmit}
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
                        name="name"
                        maxLength={256}
                        data-name="Full Name"
                        placeholder={translations.placeholders.fullName}
                        disabled={false}
                        type="text"
                        required={true}
                        autoFocus={false}
                        id="Full-Name"
                      />
                      <_Builtin.FormTextInput
                        className={cx("ms-input")}
                        name="email"
                        maxLength={256}
                        data-name="Email Address"
                        placeholder={translations.placeholders.email}
                        disabled={false}
                        type="email"
                        required={true}
                        autoFocus={false}
                        id="Email-Address"
                      />
                      <_Builtin.FormTextarea
                        className={cx("ms-input", "anon-form")}
                        name="message"
                        maxLength={5000}
                        data-name="Feedback for Sinovac"
                        placeholder={translations.placeholders.feedback}
                        required={false}
                        autoFocus={false}
                        id="Feedback-for-Sinovac"
                      />
                      <_Builtin.FormButton
                        className={cx("button-submit", "is-rounded")}
                        type="submit"
                        value={translations.submit}
                        data-wait={translations.wait}
                      />
                    </_Builtin.FormForm>
                    <_Builtin.FormSuccessMessage>
                      <div>{translations.success}</div>
                    </_Builtin.FormSuccessMessage>
                    <_Builtin.FormErrorMessage>
                      <div>{translations.error}</div>
                    </_Builtin.FormErrorMessage>
                  </_Builtin.FormWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={cx("section", "footer")}>
        <div className={cx("container-large")}>
          <div className={cx("footer-nav")}>
            <Link className={cx("footer-logo-link-wrap")} href="/">
              <_Builtin.Image
                className={cx("footer-logo")}
                width="auto"
                height="auto"
                loading="lazy"
                image={block?.logo}
              />
            </Link>
            <div
              className={cx("footer-nav-column", "wide")}
              id={cx("w-node-dcab04af-199a-c1c5-8338-07c0247120f1-eea1125b")}
            >
              {block?.links?.map((link, index) => (
                <Link
                  key={index}
                  className={cx("btn-footer_nav")}
                  href={link?.href}
                >
                  {link?.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
