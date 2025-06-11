"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function XxEmbedStyle({ as: _Component = _Builtin.HtmlEmbed }) {
  return (
    <_Component value="%3Cstyle%3E%0A%2F*%20Custom%20bullet%20%20*%2F%0Aul%20li%3A%3Amarker%20%7B%0A%20%20%20%20%2F*color%3A%20var(--brand--tafe-red)%3B%20%20Bullet%20color%20red%20*%2F%0A%20%20%20%20color%3A%20var(--black)%20%2F*%20Bullet%20color%20black%20*%2F%0A%7D%0A%0A.quote-black-border-box%3Alast-child%20%7B%0A%20%20margin-bottom%3A%200%20!important%3B%0A%7D%0A%0A.quote-black-border-box%3Alast-child%20.quote-flexbox%20%7B%0A%20%20border-bottom%3A%200%20!important%3B%0A%7D%0A%0A%3C%2Fstyle%3E" />
  );
}
