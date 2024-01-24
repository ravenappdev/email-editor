import React from "react"
import { SmartEmailEditor } from "smart-email-editor"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <SmartEmailEditor
          ref={this.editorRef}
          onFetched={(obj) => {
            console.log("onFetched", obj);
          }}
          onEditorLoad={() => {
            console.log("onEditorLoad");
          }}
          onFileUpload={file => {
            console.log("onFileUpload", file);
            return new Promise(resolve => {
              setTimeout(() => resolve({
                errorCode: null,
                url: "https://dessertsdeliveredbakery.co.uk/cdn/shop/products/Voucher_900x.png?v=1640086662"
              }), 800);
            })
          }}
          theme={{
            theme: "LIGHT",
            primary: "#a3bc1d",
            secondary: "#4b4b4b",
          }}
          translation={{
            "main": "Main 123",
            "settings": "Settings",
            "text": "Text",
            "video": "Video",
            "button": "Button",
            "column": "Column",
            "columns": "Columns",
            "divider": "Divider",
            "image": "Image",
            "basic": "Basic",
            "media": "Media",
            "uploadImage": "Upload Image",
            "mediaUrl": "Media Url",
            "placeholderText": "Placeholder text",
            "action": "Action",
            "clickUrl": "Click URL",
            "openUrlIn": "Open URL in",
            "sameTab": "Same Tab",
            "size": "Size",
            "width": "Width",
            "default": "Default",
            "spacing": "Spacing",
            "alignment": "Alignment",
            "center": "Center",
            "left": "Left",
            "right": "Right",
            "justify": "Justify",
            "padding": "Padding",
            "uniform": "Uniform",
            "top": "Top",
            "bottom": "Bottom",
            "allSides": "All Sides",
            "decoration": "Decoration",
            "color": "Color",
            "imageUrl": "Image Url",
            "border": "Border",
            "none": "None",
            "solid": "Solid",
            "dotted": "Dotted",
            "dashed": "Dashed",
            "borderRadius": "Border Radius",
            "background": "Background",
            "noContentPresent": "No content present",
            "columnProperties": "Column Properties",
            "contained": "Contained",
            "outlined": "Outlined",
            "large": "Large",
            "medium": "Medium",
            "small": "Small",
            "type": "Type",
            "buttonText": "Button Text",
            "margin": "Margin",
            "addContentBelow": "Add content below",
            "addContentAbove": "Add content above",
            "duplicate": "Duplicate",
            "delete": "Delete",
            "selectParent": "Select Parent",
            "moveUp": "Move Up",
            "moveDown": "Move Down",
            "addContent": "Add Content",
            "add": "Add",
            "thickness": "Thickness",
            "changeColumns": "Change Columns",
            "yes": "Ja",
            "no": "Nein",
            "body": "Body",
            "chooseImage": "Choose Image",
            "loseContentOfAllColumnsMessage": "You will lose the content of all the columns. Are you sure?",
            "loseContentOfColumnsMessage": "You will lose the content of last {{col}} columns. Are you sure?",
            "addNewColumnsMessage": "You will lose the content of column 1. Are you sure to add new columns?"
          }}
          editorState="eyJqc29uIjoie1wiUk9PVFwiOntcInR5cGXGCnJlc29sdmVkTmFtxBJcIkJvZHlXcmFwcGVyXCJ9LFwiaXNDYW52YXNcIjpmYWxzZSxcInByb3DEEHtcInN0eWzHS2JhY2tncm91bmRDb2xvcsVOI2UwxAJcIizMIEltYWfGbsdjZMUNd8x3ZGlzcGxhee0AmMVHY3VzdG9txHPEJ2hpZGRlbusAnG5vZGXkAJxbXCI2S3J5Y1F4TWdtXCJdLFwibGlua2VkTsche33EQMwk/wEaQ29udGFpbvMBGHRyde8BF8sLY8g3VMZbMSxcInjEHDcsXCJhbGlnbkl0ZW3EEVwiY2VudMRg6gEUTWFpbsZw9QFq7AFK7QFj6wGDZsUBxSB3aWR0aMUWMTAwJcUTaGVpZ2h0zhRib3JkZXJUb3BcIjpudWxsyRNCb3TmAXzNFlLHQs0VTGVm0RRSYWRpdeQA6jDkANFwYXJlbnRT6gDXcGFkZGluZ8Z4MTDFI8USyXfMFch2zBTHdcUTbWFyZ2luyTvKE8ZgyhDIScoSx0flAKZvcHRpb27oAdfGZ0/JFFwibGVzc+sBNdIb6wLhbekBzfAC3kNvbHVtxDftAuHSKOoCD+YBPsUV5gPY/QMN9QL/fSIsInZlcnNp5QQhMS4wLjAifQ==" />

        <button
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 999,
          }}
          onClick={() => {
            if (this.editorRef) {
              this.editorRef.current.fetchState();
            }
          }}
        >
          Fetch State
        </button>
      </React.Fragment>
    );
  }
}
