"use client";

import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import _styles from "./Navbar.module.css";
import { formatDate } from "@/utils/formatDate";
import { processFieldContent } from "@/utils/processFieldContent";
export function Client({ as: _Component = _Builtin.Block, block, locale }) {
  const content = block;
  return (
    <_Component className={_utils.cx(_styles, "nav_fixed")} tag="div">
      <_Builtin.NavbarWrapper
        className={_utils.cx(_styles, "navbar")}
        tag="div"
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        config={{
          easing: "ease",
          easing2: "ease",
          duration: 350,
          docHeight: true,
          noScroll: false,
          animation: "default",
          collapse: "medium",
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
                width="auto"
                height="auto"
                loading="lazy"
                alt="Save Sinovac"
                src="https://cdn.prod.website-files.com/68492060de718a00c917aad2/68492060de718a00c917abb2_Save-Sinovax-Orange-Logo.png"
                image={content?.["image"]}
              />
            </_Builtin.NavbarBrand>
            <_Builtin.Link
              className={_utils.cx(_styles, "button", "vote-btn-nav")}
              button={true}
              block=""
              options={{
                href: content?.["link"]?.href,
              }}
            >
              {content?.["link"]?.text}
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
                href: content?.["navbarLink"]?.href,
              }}
            >
              {content?.["navbarLink"]?.text}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link", "hidden")}
              options={{
                href: content?.["navbarLink-2"]?.href,
              }}
            >
              {content?.["navbarLink-2"]?.text}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link", "hidden")}
              options={{
                href: content?.["navbarLink-3"]?.href,
              }}
            >
              {content?.["navbarLink-3"]?.text}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link", "hidden")}
              options={{
                href: content?.["navbarLink-4"]?.href,
              }}
            >
              {content?.["navbarLink-4"]?.text}
            </_Builtin.NavbarLink>
            <_Builtin.Block
              className={_utils.cx(_styles, "china-flag-wrap", "hidden")}
              tag="div"
            >
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "nav-link")}
                options={{
                  href: content?.["navbarLink-5"]?.href,
                }}
              >
                {content?.["navbarLink-5"]?.text}
              </_Builtin.NavbarLink>
              <_Builtin.Link
                button={false}
                block="inline"
                options={{
                  href: content?.["link-2"]?.href,
                }}
              >
                {content?.["link-2"]?.text}
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
      </_Builtin.NavbarWrapper>
    </_Component>
  );
}
