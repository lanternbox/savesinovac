"use client";

import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _utils from "@/devlink/utils";
import _styles from "./NavbarSpacer.module.css";

const cx = (...args) => _utils.cx(_styles, ...args);

export function Client() {
  return <div className={cx("navbar-spacer")}></div>;
}
