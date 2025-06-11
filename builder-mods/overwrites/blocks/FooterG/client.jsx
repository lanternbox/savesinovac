"use client";
import React from "react";
import * as _Builtin from "@/devlink/_Builtin";
import * as _interactions from "@/devlink/interactions";
import * as _utils from "@/devlink/utils";
import _styles from "./FooterG.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-256":{"id":"e-256","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-273"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu","originalId":"6645ae858aced4253428ad86|46e56053-480c-09d7-2678-feacec95b78c","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu","originalId":"6645ae858aced4253428ad86|46e56053-480c-09d7-2678-feacec95b78c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1715747970777},"e-273":{"id":"e-273","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-256"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu","originalId":"6645ae858aced4253428ad86|46e56053-480c-09d7-2678-feacec95b78c","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu","originalId":"6645ae858aced4253428ad86|46e56053-480c-09d7-2678-feacec95b78c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1715747970778},"e-255":{"id":"e-255","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-35","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-259"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fade-up-1","originalId":"66eb89e2e1964ba50a12d53f|74abb200-8575-eea2-36c2-9b88d3ba541a","appliesTo":"CLASS"},"targets":[{"selector":".ip.fade-up-1","originalId":"66eb89e2e1964ba50a12d53f|74abb200-8575-eea2-36c2-9b88d3ba541a","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1716271948473},"e-259":{"id":"e-259","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-255"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fade-up-1","originalId":"66eb89e2e1964ba50a12d53f|74abb200-8575-eea2-36c2-9b88d3ba541a","appliesTo":"CLASS"},"targets":[{"selector":".ip.fade-up-1","originalId":"66eb89e2e1964ba50a12d53f|74abb200-8575-eea2-36c2-9b88d3ba541a","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1716271948474},"e-265":{"id":"e-265","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.f","originalId":"6645ae858aced4253428ad86|46e56053-480c-09d7-2678-feacec95b788","appliesTo":"CLASS"},"targets":[{"selector":".ip.f","originalId":"6645ae858aced4253428ad86|46e56053-480c-09d7-2678-feacec95b788","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1715743856566},"e-262":{"id":"e-262","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-15","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-265"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.f","originalId":"6645ae858aced4253428ad86|46e56053-480c-09d7-2678-feacec95b788","appliesTo":"CLASS"},"targets":[{"selector":".ip.f","originalId":"6645ae858aced4253428ad86|46e56053-480c-09d7-2678-feacec95b788","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1715743856567},"e-254":{"id":"e-254","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-251"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu6","originalId":"66eb89e2e1964ba50a12d53f|74abb200-8575-eea2-36c2-9b88d3ba542e","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu6","originalId":"66eb89e2e1964ba50a12d53f|74abb200-8575-eea2-36c2-9b88d3ba542e","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1716271747066},"e-251":{"id":"e-251","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-254"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu6","originalId":"66eb89e2e1964ba50a12d53f|74abb200-8575-eea2-36c2-9b88d3ba542e","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu6","originalId":"66eb89e2e1964ba50a12d53f|74abb200-8575-eea2-36c2-9b88d3ba542e","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1716271747067},"e-933":{"id":"e-933","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-35","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-934"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu1","originalId":"67c14fc6fb7f4c958022214e|c110db29-a17b-543b-3752-458dc97bd4e4","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu1","originalId":"67c14fc6fb7f4c958022214e|c110db29-a17b-543b-3752-458dc97bd4e4","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733972819637},"e-934":{"id":"e-934","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-933"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu1","originalId":"67c14fc6fb7f4c958022214e|c110db29-a17b-543b-3752-458dc97bd4e4","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu1","originalId":"67c14fc6fb7f4c958022214e|c110db29-a17b-543b-3752-458dc97bd4e4","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733972819643},"e-935":{"id":"e-935","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-16","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-936"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu2","originalId":"67c14fc6fb7f4c958022214e|5971f792-d2c0-fafd-143d-4297dee1424c","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu2","originalId":"67c14fc6fb7f4c958022214e|5971f792-d2c0-fafd-143d-4297dee1424c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733973813597},"e-936":{"id":"e-936","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-935"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu2","originalId":"67c14fc6fb7f4c958022214e|5971f792-d2c0-fafd-143d-4297dee1424c","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu2","originalId":"67c14fc6fb7f4c958022214e|5971f792-d2c0-fafd-143d-4297dee1424c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733973813603},"e-937":{"id":"e-937","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-938"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu3","originalId":"67c14fc6fb7f4c958022214e|c71f6303-49e3-33a8-4e06-75cf13e85614","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu3","originalId":"67c14fc6fb7f4c958022214e|c71f6303-49e3-33a8-4e06-75cf13e85614","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733974925977},"e-938":{"id":"e-938","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-34","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-937"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu3","originalId":"67c14fc6fb7f4c958022214e|c71f6303-49e3-33a8-4e06-75cf13e85614","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu3","originalId":"67c14fc6fb7f4c958022214e|c71f6303-49e3-33a8-4e06-75cf13e85614","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733974925983},"e-939":{"id":"e-939","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-940"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu4","originalId":"67c14fc6fb7f4c958022214e|d132579d-cbd7-0d01-64c0-0d110c9538da","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu4","originalId":"67c14fc6fb7f4c958022214e|d132579d-cbd7-0d01-64c0-0d110c9538da","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733975444211},"e-940":{"id":"e-940","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-939"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu4","originalId":"67c14fc6fb7f4c958022214e|d132579d-cbd7-0d01-64c0-0d110c9538da","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu4","originalId":"67c14fc6fb7f4c958022214e|d132579d-cbd7-0d01-64c0-0d110c9538da","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733975444217},"e-941":{"id":"e-941","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-942"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu5","originalId":"67c14fc6fb7f4c958022214e|17473bee-fee7-ed09-1fa8-18da5c929ab4","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu5","originalId":"67c14fc6fb7f4c958022214e|17473bee-fee7-ed09-1fa8-18da5c929ab4","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733975594635},"e-942":{"id":"e-942","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-941"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip.fu5","originalId":"67c14fc6fb7f4c958022214e|17473bee-fee7-ed09-1fa8-18da5c929ab4","appliesTo":"CLASS"},"targets":[{"selector":".ip.fu5","originalId":"67c14fc6fb7f4c958022214e|17473bee-fee7-ed09-1fa8-18da5c929ab4","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733975594641},"e-949":{"id":"e-949","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-75","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-950"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip","originalId":"67c14fc6fb7f4c958022214e|44584860-4eb0-d256-a7b6-72a7579b0539","appliesTo":"CLASS"},"targets":[{"selector":".ip","originalId":"67c14fc6fb7f4c958022214e|44584860-4eb0-d256-a7b6-72a7579b0539","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733986544590},"e-950":{"id":"e-950","name":"","animationType":"custom","eventTypeId":"SCROLL_OUT_OF_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-76","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ip","originalId":"67c14fc6fb7f4c958022214e|44584860-4eb0-d256-a7b6-72a7579b0539","appliesTo":"CLASS"},"targets":[{"selector":".ip","originalId":"67c14fc6fb7f4c958022214e|44584860-4eb0-d256-a7b6-72a7579b0539","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1733986544596}},"actionLists":{"a-12":{"id":"a-12","title":"fade-up","actionItemGroups":[{"actionItems":[{"id":"a-12-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cc1"]},"value":0,"unit":""}},{"id":"a-12-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cc1"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-12-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cc1"]},"value":1,"unit":""}},{"id":"a-12-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":200,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cc1"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715744231593},"a-26":{"id":"a-26","title":"fade-up (out)","actionItemGroups":[{"actionItems":[{"id":"a-26-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cc1"]},"value":0,"unit":""}},{"id":"a-26-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cc1"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715744373601},"a-35":{"id":"a-35","title":"fade-up-1","actionItemGroups":[{"actionItems":[{"id":"a-35-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu1","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","9b58d73f-09a9-c1c6-c4f0-00fb1ff9071b"]},"value":0,"unit":""}},{"id":"a-35-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu1","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","9b58d73f-09a9-c1c6-c4f0-00fb1ff9071b"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-35-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":300,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu1","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","9b58d73f-09a9-c1c6-c4f0-00fb1ff9071b"]},"value":1,"unit":""}},{"id":"a-35-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":300,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu1","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","9b58d73f-09a9-c1c6-c4f0-00fb1ff9071b"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715745050038},"a-27":{"id":"a-27","title":"fade-up-1 (out)","actionItemGroups":[{"actionItems":[{"id":"a-27-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu1","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","9b58d73f-09a9-c1c6-c4f0-00fb1ff9071b"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-27-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu1","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","9b58d73f-09a9-c1c6-c4f0-00fb1ff9071b"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715745050038},"a-30":{"id":"a-30","title":"fade","actionItemGroups":[{"actionItems":[{"id":"a-30-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.f","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd8"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-30-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.f","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd8"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715743863415},"a-15":{"id":"a-15","title":"fade (out)","actionItemGroups":[{"actionItems":[{"id":"a-15-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.f","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd8"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715743958770},"a-20":{"id":"a-20","title":"fade-up-6","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu6","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd0"]},"value":0,"unit":""}},{"id":"a-20-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu6","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd0"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-20-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":800,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu6","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd0"]},"value":1,"unit":""}},{"id":"a-20-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":800,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu6","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd0"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715745050038},"a-11":{"id":"a-11","title":"fade-up-6 (out)","actionItemGroups":[{"actionItems":[{"id":"a-11-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu6","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd0"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-11-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu6","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd0"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715745050038},"a-16":{"id":"a-16","title":"fade-up-2","actionItemGroups":[{"actionItems":[{"id":"a-16-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu2","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","bb4f2882-0d18-25aa-e4f8-93bc33be76ba"]},"value":0,"unit":""}},{"id":"a-16-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu2","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","bb4f2882-0d18-25aa-e4f8-93bc33be76ba"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-16-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":400,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu2","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","bb4f2882-0d18-25aa-e4f8-93bc33be76ba"]},"value":1,"unit":""}},{"id":"a-16-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":400,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu2","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","bb4f2882-0d18-25aa-e4f8-93bc33be76ba"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715745050038},"a-19":{"id":"a-19","title":"fade-up-2 (out)","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu2","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","bb4f2882-0d18-25aa-e4f8-93bc33be76ba"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-19-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu2","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","bb4f2882-0d18-25aa-e4f8-93bc33be76ba"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715745050038},"a-31":{"id":"a-31","title":"fade-up-3","actionItemGroups":[{"actionItems":[{"id":"a-31-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu3","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","8b0de3b0-febd-65ae-830d-6f8c731c3a34"]},"value":0,"unit":""}},{"id":"a-31-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu3","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","8b0de3b0-febd-65ae-830d-6f8c731c3a34"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-31-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":500,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu3","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","8b0de3b0-febd-65ae-830d-6f8c731c3a34"]},"value":1,"unit":""}},{"id":"a-31-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":500,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu3","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","8b0de3b0-febd-65ae-830d-6f8c731c3a34"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715745050038},"a-34":{"id":"a-34","title":"fade-up-3 (out)","actionItemGroups":[{"actionItems":[{"id":"a-34-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu3","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","8b0de3b0-febd-65ae-830d-6f8c731c3a34"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-34-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu3","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","8b0de3b0-febd-65ae-830d-6f8c731c3a34"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715745050038},"a-28":{"id":"a-28","title":"fade-up-4","actionItemGroups":[{"actionItems":[{"id":"a-28-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu4","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd6"]},"value":0,"unit":""}},{"id":"a-28-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu4","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd6"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-28-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":600,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu4","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd6"]},"value":1,"unit":""}},{"id":"a-28-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":600,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu4","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd6"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715745050038},"a-18":{"id":"a-18","title":"fade-up-4 (out)","actionItemGroups":[{"actionItems":[{"id":"a-18-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu4","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd6"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-18-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu4","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","e379de13-127b-69b0-c47d-6880ec652cd6"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715745050038},"a-14":{"id":"a-14","title":"fade-up-5","actionItemGroups":[{"actionItems":[{"id":"a-14-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu5","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","5985548d-87bf-2106-675f-8571d858535b"]},"value":0,"unit":""}},{"id":"a-14-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu5","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","5985548d-87bf-2106-675f-8571d858535b"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-14-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":700,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu5","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","5985548d-87bf-2106-675f-8571d858535b"]},"value":1,"unit":""}},{"id":"a-14-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":700,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu5","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","5985548d-87bf-2106-675f-8571d858535b"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715745050038},"a-13":{"id":"a-13","title":"fade-up-5 (out)","actionItemGroups":[{"actionItems":[{"id":"a-13-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu5","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","5985548d-87bf-2106-675f-8571d858535b"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-13-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".it.fu5","selectorGuids":["e379de13-127b-69b0-c47d-6880ec652cab","5985548d-87bf-2106-675f-8571d858535b"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715745050038},"a-75":{"id":"a-75","title":"fade-up - all","actionItemGroups":[{"actionItems":[{"id":"a-75-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".f","selectorGuids":["bbdf254c-3a5a-7fff-350f-44918e32f495"]},"value":0,"unit":""}},{"id":"a-75-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu","selectorGuids":["cc8be87c-0cd1-2261-eb97-0c021f8245e1"]},"value":0,"unit":""}},{"id":"a-75-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu","selectorGuids":["cc8be87c-0cd1-2261-eb97-0c021f8245e1"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu1","selectorGuids":["9b85ef11-329f-e84a-e179-8660a12a9d19"]},"value":0,"unit":""}},{"id":"a-75-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu1","selectorGuids":["9b85ef11-329f-e84a-e179-8660a12a9d19"]},"yValue":15,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu2","selectorGuids":["f7a6ee49-bf33-3f1d-471b-e644298fd268"]},"value":0,"unit":""}},{"id":"a-75-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu2","selectorGuids":["f7a6ee49-bf33-3f1d-471b-e644298fd268"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-15","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu3","selectorGuids":["60722f4e-6e02-6967-f672-5aa4ead9a8d7"]},"value":0,"unit":""}},{"id":"a-75-n-16","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu3","selectorGuids":["60722f4e-6e02-6967-f672-5aa4ead9a8d7"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu4","selectorGuids":["9caa5e82-2048-a500-3deb-303861ab4aa1"]},"value":0,"unit":""}},{"id":"a-75-n-18","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu4","selectorGuids":["9caa5e82-2048-a500-3deb-303861ab4aa1"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-19","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu5","selectorGuids":["9e3b6327-e58a-4c33-5cc5-92567722945c"]},"value":0,"unit":""}},{"id":"a-75-n-20","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu5","selectorGuids":["9e3b6327-e58a-4c33-5cc5-92567722945c"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-21","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu6","selectorGuids":["115a6575-c83c-53be-0813-6156f4c8efdb"]},"value":0,"unit":""}},{"id":"a-75-n-22","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu6","selectorGuids":["115a6575-c83c-53be-0813-6156f4c8efdb"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-75-n-14","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".f","selectorGuids":["bbdf254c-3a5a-7fff-350f-44918e32f495"]},"value":1,"unit":""}},{"id":"a-75-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu","selectorGuids":["cc8be87c-0cd1-2261-eb97-0c021f8245e1"]},"value":1,"unit":""}},{"id":"a-75-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":200,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu","selectorGuids":["cc8be87c-0cd1-2261-eb97-0c021f8245e1"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":300,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu1","selectorGuids":["9b85ef11-329f-e84a-e179-8660a12a9d19"]},"value":1,"unit":""}},{"id":"a-75-n-8","actionTypeId":"TRANSFORM_MOVE","config":{"delay":300,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu1","selectorGuids":["9b85ef11-329f-e84a-e179-8660a12a9d19"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":400,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu2","selectorGuids":["f7a6ee49-bf33-3f1d-471b-e644298fd268"]},"value":1,"unit":""}},{"id":"a-75-n-10","actionTypeId":"TRANSFORM_MOVE","config":{"delay":400,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu2","selectorGuids":["f7a6ee49-bf33-3f1d-471b-e644298fd268"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-23","actionTypeId":"STYLE_OPACITY","config":{"delay":500,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu3","selectorGuids":["60722f4e-6e02-6967-f672-5aa4ead9a8d7"]},"value":1,"unit":""}},{"id":"a-75-n-24","actionTypeId":"TRANSFORM_MOVE","config":{"delay":500,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu3","selectorGuids":["60722f4e-6e02-6967-f672-5aa4ead9a8d7"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-25","actionTypeId":"STYLE_OPACITY","config":{"delay":600,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu4","selectorGuids":["9caa5e82-2048-a500-3deb-303861ab4aa1"]},"value":1,"unit":""}},{"id":"a-75-n-26","actionTypeId":"TRANSFORM_MOVE","config":{"delay":600,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu4","selectorGuids":["9caa5e82-2048-a500-3deb-303861ab4aa1"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-27","actionTypeId":"STYLE_OPACITY","config":{"delay":700,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu5","selectorGuids":["9e3b6327-e58a-4c33-5cc5-92567722945c"]},"value":1,"unit":""}},{"id":"a-75-n-28","actionTypeId":"TRANSFORM_MOVE","config":{"delay":700,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu5","selectorGuids":["9e3b6327-e58a-4c33-5cc5-92567722945c"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-75-n-29","actionTypeId":"STYLE_OPACITY","config":{"delay":800,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu6","selectorGuids":["115a6575-c83c-53be-0813-6156f4c8efdb"]},"value":1,"unit":""}},{"id":"a-75-n-30","actionTypeId":"TRANSFORM_MOVE","config":{"delay":800,"easing":"ease","duration":1500,"target":{"useEventTarget":"CHILDREN","selector":".fu6","selectorGuids":["115a6575-c83c-53be-0813-6156f4c8efdb"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715744231593},"a-76":{"id":"a-76","title":"fade-up - all (out)","actionItemGroups":[{"actionItems":[{"id":"a-76-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu","selectorGuids":["cc8be87c-0cd1-2261-eb97-0c021f8245e1"]},"value":0,"unit":""}},{"id":"a-76-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu","selectorGuids":["cc8be87c-0cd1-2261-eb97-0c021f8245e1"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-76-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu1","selectorGuids":["9b85ef11-329f-e84a-e179-8660a12a9d19"]},"value":0,"unit":""}},{"id":"a-76-n-4","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu1","selectorGuids":["9b85ef11-329f-e84a-e179-8660a12a9d19"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-76-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu2","selectorGuids":["f7a6ee49-bf33-3f1d-471b-e644298fd268"]},"value":0,"unit":""}},{"id":"a-76-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu2","selectorGuids":["f7a6ee49-bf33-3f1d-471b-e644298fd268"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-76-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu3","selectorGuids":["60722f4e-6e02-6967-f672-5aa4ead9a8d7"]},"value":0,"unit":""}},{"id":"a-76-n-8","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu3","selectorGuids":["60722f4e-6e02-6967-f672-5aa4ead9a8d7"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-76-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu4","selectorGuids":["9caa5e82-2048-a500-3deb-303861ab4aa1"]},"value":0,"unit":""}},{"id":"a-76-n-10","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu4","selectorGuids":["9caa5e82-2048-a500-3deb-303861ab4aa1"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-76-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu5","selectorGuids":["9e3b6327-e58a-4c33-5cc5-92567722945c"]},"value":0,"unit":""}},{"id":"a-76-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu5","selectorGuids":["9e3b6327-e58a-4c33-5cc5-92567722945c"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-76-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu6","selectorGuids":["115a6575-c83c-53be-0813-6156f4c8efdb"]},"value":0,"unit":""}},{"id":"a-76-n-14","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".fu6","selectorGuids":["115a6575-c83c-53be-0813-6156f4c8efdb"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-76-n-15","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".f","selectorGuids":["bbdf254c-3a5a-7fff-350f-44918e32f495"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715744373601}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}',
);

export function Client({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "footer2_component")}
      tag="footer"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "text-color-alternate")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "padding-global")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "container-large")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "padding-vertical",
                "padding-xxlarge",
              )}
              tag="div"
            >
              <_Builtin.Block className={_utils.cx(_styles, "ip")} tag="div">
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "padding-bottom",
                    "padding-xxlarge",
                  )}
                  tag="div"
                >
                  <_Builtin.Grid
                    className={_utils.cx(_styles, "footer2_all-wrapper")}
                    id={_utils.cx(
                      _styles,
                      "w-node-_9088a18e-509e-bd8d-3cf6-0559bbda0bd7-bbda0bd1",
                    )}
                    tag="div"
                  >
                    <_Builtin.NavbarBrand
                      className={_utils.cx(_styles, "footer2_logo-link", "fu")}
                      id={_utils.cx(
                        _styles,
                        "w-node-_9088a18e-509e-bd8d-3cf6-0559bbda0bd8-bbda0bd1",
                      )}
                      options={{
                        href: "#",
                      }}
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "footer2_logo")}
                        width="auto"
                        height="auto"
                        loading="lazy"
                        alt=""
                        src="https://cdn.prod.website-files.com/67c14fc6fb7f4c95802220ba/67c14fc6fb7f4c958022213d_logo-square-global.svg"
                      />
                    </_Builtin.NavbarBrand>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "footer2_link-column")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "footer2_link-list")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "fu")}
                          tag="div"
                        >
                          <_Builtin.Heading
                            className={_utils.cx(_styles, "heading-style-h4")}
                            tag="h2"
                          >
                            {"欢迎通过电子邮件订阅"}
                            <br />
                            {"劳氏最新动态与合规资讯"}
                          </_Builtin.Heading>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "margin-top",
                            "margin-xsmall",
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "fu1")}
                            tag="div"
                          >
                            <_Builtin.Paragraph>
                              {"我们将保持内容的相关性，保持联系。"}
                              <br />
                            </_Builtin.Paragraph>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "margin-top",
                            "margin-medium",
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "fu2")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "button-group")}
                              tag="div"
                            >
                              <_Builtin.Link
                                className={_utils.cx(
                                  _styles,
                                  "button",
                                  "is-eu",
                                  "is-inverse",
                                )}
                                button={true}
                                block=""
                                options={{
                                  href: "#",
                                }}
                              >
                                {"立刻订阅 "}
                                <_Builtin.Span
                                  className={_utils.cx(
                                    _styles,
                                    "hover-list_arrow",
                                    "is-inverse",
                                  )}
                                >
                                  <_Builtin.Strong>{"→"}</_Builtin.Strong>
                                </_Builtin.Span>
                              </_Builtin.Link>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "footer-right")}
                      tag="div"
                    >
                      <_Builtin.Block tag="div">
                        <_Builtin.Block
                          className={_utils.cx(_styles, "footer2_link-column")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "margin-bottom",
                              "margin-xsmall",
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "margin-bottom",
                                "margin-small",
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fu3")}
                                tag="div"
                              >
                                <_Builtin.Heading
                                  className={_utils.cx(
                                    _styles,
                                    "heading-style-h6",
                                    "footer-heading",
                                  )}
                                  tag="h2"
                                >
                                  {"关注微信公众号"}
                                </_Builtin.Heading>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "footer2_link-list")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "qr-wrap", "fu4")}
                              tag="div"
                            >
                              <_Builtin.Image
                                width="auto"
                                height="auto"
                                loading="lazy"
                                alt=""
                                src="https://cdn.prod.website-files.com/67c14fc6fb7f4c95802220ba/67c14fc6fb7f4c9580222153_qr-placeholder.png"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "footer-address-block")}
                        id={_utils.cx(
                          _styles,
                          "w-node-_9088a18e-509e-bd8d-3cf6-0559bbda0bf5-bbda0bd1",
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "margin-bottom",
                            "margin-small",
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "fu3")}
                            tag="div"
                          >
                            <_Builtin.Heading
                              className={_utils.cx(
                                _styles,
                                "heading-style-h6",
                                "footer-heading",
                              )}
                              tag="h2"
                            >
                              {"大中华区总部"}
                            </_Builtin.Heading>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "margin-bottom",
                            "margin-xsmall",
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "fu4")}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"上海市黄浦区南京西路288号"}
                              <br />
                              {"创兴金融中心12楼"}
                              <br />
                              {"邮编 200003"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "margin-bottom",
                            "margin-xsmall",
                            "hide-mobile-landscape",
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "fu5")}
                            tag="div"
                          >
                            <_Builtin.Link
                              button={false}
                              block=""
                              options={{
                                href: "tel:+862163151068",
                              }}
                            >
                              {"+86 21 6315 1068"}
                            </_Builtin.Link>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "margin-top",
                            "margin-medium",
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "fu6")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "button-group")}
                              tag="div"
                            >
                              <_Builtin.Link
                                className={_utils.cx(_styles, "button")}
                                button={true}
                                block=""
                                options={{
                                  href: "https://isupportondemand.contentour.com/questionnaire/questionnaire_view/questionnaire_id/393/invite/781",
                                  target: "_blank",
                                }}
                              >
                                {"联络我们 "}
                                <_Builtin.Span
                                  className={_utils.cx(
                                    _styles,
                                    "hover-list_arrow",
                                    "is-inverse",
                                  )}
                                />
                              </_Builtin.Link>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Grid>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "fu6")} tag="div">
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "line-divider",
                      "is-eu-accent-on-primary",
                    )}
                    tag="div"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "padding-top",
                    "padding-medium",
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "footer2_bottom-wrapper",
                      "fu6",
                    )}
                    tag="div"
                  >
                    <_Builtin.Grid
                      className={_utils.cx(_styles, "footer2_legal-list")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "footer2_credit-text")}
                        id={_utils.cx(
                          _styles,
                          "w-node-_9088a18e-509e-bd8d-3cf6-0559bbda0c0c-bbda0bd1",
                        )}
                        tag="div"
                      >
                        {"© 2024 劳氏船级社 版权所有"}
                      </_Builtin.Block>
                      <_Builtin.Link
                        className={_utils.cx(_styles, "footer2_legal-link")}
                        button={false}
                        block=""
                        options={{
                          href: "#",
                        }}
                      >
                        {"隐私条款"}
                      </_Builtin.Link>
                      <_Builtin.Link
                        className={_utils.cx(_styles, "footer2_legal-link")}
                        button={false}
                        block=""
                        options={{
                          href: "#",
                        }}
                      >
                        {"Cookie 设置"}
                      </_Builtin.Link>
                    </_Builtin.Grid>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
