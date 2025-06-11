"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./XxNavigation.module.css";

export function XxNavigation({ as: _Component = _Builtin.NavbarWrapper }) {
  return (
    <_Component
      className={_utils.cx(_styles, "navbar")}
      tag="div"
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      config={{
        animation: "default",
        easing: "ease",
        easing2: "ease",
        duration: 350,
        collapse: "medium",
        noScroll: false,
        docHeight: true,
      }}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "navigation-centre")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "navigation-logo-top")}
          tag="div"
        >
          <_Builtin.NavbarBrand
            className={_utils.cx(_styles, "brand")}
            options={{
              href: "#",
            }}
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "logo")}
              loading="lazy"
              width="auto"
              height="auto"
              alt="Save Sinovac"
              src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917abb2_Save-Sinovax-Orange-Logo.png"
            />
          </_Builtin.NavbarBrand>
          <_Builtin.Link
            className={_utils.cx(_styles, "button", "vote-btn-nav")}
            button={true}
            block=""
            options={{
              href: "#",
            }}
          >
            {"HOWTOVOTE"}
          </_Builtin.Link>
        </_Builtin.Block>
        <_Builtin.NavbarMenu
          className={_utils.cx(_styles, "nav-menu")}
          tag="nav"
          role="navigation"
        >
          <_Builtin.NavbarLink
            className={_utils.cx(_styles, "nav-link", "hidden")}
            options={{
              href: "#",
            }}
          >
            <_Builtin.Strong>{"The Case For Change"}</_Builtin.Strong>
          </_Builtin.NavbarLink>
          <_Builtin.NavbarLink
            className={_utils.cx(_styles, "nav-link", "hidden")}
            options={{
              href: "#",
            }}
          >
            {"OURNOMINEES"}
          </_Builtin.NavbarLink>
          <_Builtin.NavbarLink
            className={_utils.cx(_styles, "nav-link", "hidden")}
            options={{
              href: "#",
            }}
          >
            {"Resources"}
          </_Builtin.NavbarLink>
          <_Builtin.NavbarLink
            className={_utils.cx(_styles, "nav-link", "hidden")}
            options={{
              href: "#",
            }}
          >
            {"How To Vote"}
          </_Builtin.NavbarLink>
          <_Builtin.Block
            className={_utils.cx(_styles, "china-flag-wrap", "hidden")}
            tag="div"
          >
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "#",
              }}
            >
              {"CN"}
            </_Builtin.NavbarLink>
            <_Builtin.Link
              button={false}
              block="inline"
              options={{
                href: "#",
              }}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "china-flag-icon")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917abaf_China-Flag.png"
              />
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.NavbarMenu>
        <_Builtin.NavbarButton
          className={_utils.cx(_styles, "menu-button-green")}
          tag="div"
        >
          <_Builtin.Icon
            className={_utils.cx(_styles, "hamburger")}
            widget={{
              type: "icon",
              icon: "nav-menu",
            }}
          />
        </_Builtin.NavbarButton>
      </_Builtin.Block>
    </_Component>
  );
}
