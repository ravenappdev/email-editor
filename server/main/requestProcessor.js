import React from "react";
import ReactDOMServer from "react-dom/server";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "./theme";
import { generateJSX } from "./craftNodesProcessor";
import { toJSON, toCSS } from "cssjson";
import extract from "extract-inline-css";

function splitCSS(css) {
  const json = toJSON(css)["children"];
  let styles = "";
  Object.entries(json).map(([key, value]) => {
    const obj = {
      children: {
        [key]: value,
      },
    };
    styles += `
            <style type="text/css">
                ${toCSS(obj)}
            </style>
        `;
  });
  return styles;
}
function renderFullPage(html1, css1, bodyBgColor, bodyBgImage) {
  return `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
            ${splitCSS(css1)}

        <style type="text/css">
            .mainClass{
                width: 58.333333333333336%
            }
        </style>
        <style type="text/css">
            .braft-output-content p{min-height:1em}.braft-output-content .image-wrap img{max-width:100%;height:auto}.braft-output-content ul,.braft-output-content ol{margin:16px 0;padding:0}.braft-output-content blockquote{margin:0 0 10px 0;padding:15px 20px;background-color:#f1f2f3;border-left:solid 5px #ccc;color:#666;font-style:italic}.braft-output-content pre{max-width:100%;max-height:100%;margin:10px 0;padding:15px;overflow:auto;background-color:#f1f2f3;border-radius:3px;color:#666;font-family:monospace;font-size:14px;font-weight:normal;line-height:16px;}.braft-output-content pre pre{margin:0;padding:0}
            @media  (max-width: 768px) {
                /* For mobile phones: */
                .mainClass {
                    width: 100%;
                }
            }
            @media screen and (max-width: 600px) {
                table td#containerCol {
                    display: flex;
                    width: 100%;
                }
            }
        </style>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
       
      </head>
      <body style="
            background-color:${bodyBgColor};
            background-image: url(${bodyBgImage});
            background-repeat: no-repeat;
            background-size: cover;
            background-attachment: fixed;
        ">
        ${html1}
        
      </body>
        <script type="text/javascript">
          var w=window.innerWidth;
          if(w < 800) document.getElementById("Main").className=("MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12");
        </script>
    </html>
  `;
}

export default function handleRender(req, res) {
  const sheets = new ServerStyleSheets();
  const { jsx, bodyBgColor, bodyBgImage } = generateJSX(req.body.app);
  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={createTheme()}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <>{jsx}</>
        {/* {deserialize(req.body.app)} */}
      </ThemeProvider>
    )
  );

  // Grab the CSS from our sheets.
  const css = sheets.toString();

  res.statusCode = 200;
  res.setHeader("content-type", "text/plain");
  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css, bodyBgColor, bodyBgImage));
}
