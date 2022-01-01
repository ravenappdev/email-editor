import React from "react";
import lodash from "lodash";

import {
  ButtonExport,
  CardExport,
  CardTopExport,
  CardBottomExport,
  ContainerExport,
  TextExport,
  ImageExport,
  HtmlBoxExport,
  VideoExport,
  CustomDividerExport,
  ResizerExport,
} from "./exportComponents/index.js";
import { BodyWrapperExport } from "./exportComponents/BodyWrapper/BodyWrapperExport.js";

var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

var RESOLVERS = {
  Text: TextExport,
  Container: ContainerExport,
  Button: ButtonExport,
  Image: ImageExport,
  Video: VideoExport,
  HtmlBox: HtmlBoxExport,
  CustomDivider: CustomDividerExport,
  Resizer: ResizerExport,
  BodyWrapper: BodyWrapperExport,
};
function getNodeById(nodes, id) {
  return lodash.find(nodes, function(node) {
    return node.id === id;
  });
}
var deserializeNodes = function(nodes, id, sorted) {
  if (id === void 0) {
    id = "ROOT";
  }
  if (sorted === void 0) {
    sorted = [];
  }

  var node = nodes[id];

  if (!node) {
    throw new Error("Could not find node " + id);
  }
  sorted.push(__assign({ id: id }, node));
  lodash.each(node.nodes, function(n) {
    sorted.push.apply(sorted, deserializeNodes(nodes, n));
  });
  lodash.each(node.linkedNodes, function(n) {
    sorted.push.apply(sorted, deserializeNodes(nodes, n));
  });
  return sorted;
};
function getDescendants(nodes, id, deep, includeOnly) {
  if (deep === void 0) {
    deep = false;
  }
  function appendChildNode(id, descendants, depth) {
    if (descendants === void 0) {
      descendants = [];
    }
    if (depth === void 0) {
      depth = 0;
    }
    if (deep || (!deep && depth === 0)) {
      var node = getNodeById(nodes, id);
      if (!node) {
        return descendants;
      }
      if (includeOnly !== "childNodes") {
        // Include linkedNodes if any
        var linkedNodes = node.linkedNodes;
        lodash.each(linkedNodes, function(nodeId) {
          descendants.push(nodeId);
          descendants = appendChildNode(nodeId, descendants, depth + 1);
        });
      }
      if (includeOnly !== "linkedNodes") {
        var childNodes = node.nodes;
        lodash.each(childNodes, function(nodeId) {
          descendants.push(nodeId);
          descendants = appendChildNode(nodeId, descendants, depth + 1);
        });
      }
      return descendants;
    }
    return descendants;
  }
  return lodash.compact(
    lodash.map(appendChildNode(id), function(nid) {
      return getNodeById(nodes, nid);
    })
  );
}
function renderNode(nodes, resolver, nodeId, key) {
  var node = getNodeById(nodes, nodeId);
  if (!node) {
    throw new Error("Could not find node with id " + nodeId);
  }
  var resolvedComponent = RESOLVERS[node.type.resolvedName];

  var descendants = getDescendants(nodes, nodeId);
  var children = lodash.map(descendants, function(descendant, index) {
    return renderNode(nodes, resolver, descendant.id, index);
  });

  let tmp = React.createElement(resolvedComponent, {
    ...node.props,
    isSSR: true,
    id: nodeId,
    key: key,
    children,
  });

  return tmp;
}
var renderNodesToJSX = function(nodes, resolver, nodeId) {
  return renderNode(nodes, resolver, nodeId, 12200);
};
export function generateJSX(craftJsNodes) {
  var nodes = deserializeNodes(craftJsNodes);
  const bodyBackgroundColor = craftJsNodes["ROOT"].props.style.backgroundColor;
  const bodyBackgroundImage = craftJsNodes["ROOT"].props.style.backgroundImage;
  var jsx = renderNodesToJSX(nodes, RESOLVERS, "ROOT");
  return {
    jsx: jsx,
    bodyBgColor: bodyBackgroundColor,
    bodyBgImage: bodyBackgroundImage,
  };
}
