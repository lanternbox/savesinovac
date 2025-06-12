"use client";

import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import _styles from "./Navbar.module.css";
import Link from "next/link";

const cx = (...args) => _utils.cx(_styles, ...args);

export function Client({ block }) {
  return (
    <div className={cx("nav_fixed")}>
      <div className={cx("navbar")}>
        <div className={cx("navigation-centre")}>
          <div className={cx("navigation-logo-top")}>
            <Link className={cx("brand")} href="/">
              <_Builtin.Image
                className={cx("logo")}
                width="auto"
                height="auto"
                loading="lazy"
                image={block?.logo}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
