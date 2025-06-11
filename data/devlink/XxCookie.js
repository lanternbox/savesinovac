"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./XxCookie.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e":{"id":"e","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-2"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"da0d0964-52f4-342d-a528-8d00c97098ce","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"da0d0964-52f4-342d-a528-8d00c97098ce","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706155529269}},"actionLists":{"a":{"id":"a","title":"Close Cookie","actionItemGroups":[{"actionItems":[{"id":"a-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"selector":".float-center-cookie.popup-overlay","selectorGuids":["fb892d68-ea78-87dd-1874-fb2065eba234","fb892d68-ea78-87dd-1874-fb2065eba239"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".float-center-cookie.popup-overlay","selectorGuids":["fb892d68-ea78-87dd-1874-fb2065eba234","fb892d68-ea78-87dd-1874-fb2065eba239"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1706155537104}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function XxCookie({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "float-center-cookie", "popup-overlay")}
      tag="div"
      id="modal3"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "disclaimer-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "disclaimer-block")}
          tag="div"
        >
          <_Builtin.RichText
            className={_utils.cx(_styles, "scrolling-disclaimer")}
            tag="div"
            slot=""
          >
            <_Builtin.Paragraph>
              <_Builtin.Strong>{"DISCLAIMER"}</_Builtin.Strong>
            </_Builtin.Paragraph>
            <_Builtin.Paragraph>
              {"New disclaimer coming soon"}
            </_Builtin.Paragraph>
            <_Builtin.Paragraph>{"‍"}</_Builtin.Paragraph>
          </_Builtin.RichText>
          <_Builtin.Link
            className={_utils.cx(_styles, "button", "is-wide")}
            data-w-id="da0d0964-52f4-342d-a528-8d00c97098ce"
            button={true}
            id="close-modal3"
            block=""
            options={{
              href: "#",
            }}
          >
            {"IAgree"}
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(_styles, "floating-x", "d-none")}
            button={false}
            id="close-modal-x3"
            block="inline"
            options={{
              href: "#",
            }}
          />
          <_Builtin.HtmlEmbed value="%3Cscript%20src%3D%22https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fjquery%2F3.5.1%2Fjquery.slim.min.js%22%3E%3C%2Fscript%3E%0A%3Cscript%20src%3D%22https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fjs-cookie%2F2.2.1%2Fjs.cookie.min.js%22%3E%3C%2Fscript%3E%0A%0A%3Cscript%3E%0A%2F%2F%20%24(document).ready(function()%7B%0A%09%2F%2F%20if%20(!Cookies.get('disclaimer2'))%20%7B%20%0A%09%20%20%2F%2F%20%24('.popup-overlay').show()%3B%20%0A%20%09%20%20%2F%2F%20Cookies.set('disclaimer2'%2C%20true%2C%20%7B%20expires%3A%201%20%7D)%3B%0A%09%2F%2F%20%7D%0A%2F%2F%20%7D)%3B%0A%2F%2F%20Documentation%20at%20https%3A%2F%2Fgithub.com%2Fjs-cookie%2Fjs-cookie%0A%3C%2Fscript%3E" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
