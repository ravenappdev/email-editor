import React, { forwardRef } from "react";
export const Grid = forwardRef(
  (
    { container, item, xs, alignContent, justifyContent, children, style, id },
    ref
  ) => {
    if (container && !item) {
      return (
        <table
          style={{
            width: "100%",
            ...style,
            tableLayout: "fixed",
            borderSpacing: "0",
          }}
          cellSpacing="0"
        >
          <tbody align={justifyContent} style={{ width: "100%" }}>
            {children}
          </tbody>
        </table>
      );
    } else {
      return (
        <tr>
          <td style={{ padding: 0 }}>
            <div style={{ ...style }}>
              <div
                id={id}
                style={{
                  ...(id !== "Main"
                    ? {
                        width: `${(100 / 12) * xs}%`,

                        ///border: "2px solid black",
                        //   overflowWrap: "break-word"
                      }
                    : {}),
                }}
                className={id === "Main" ? "mainClass" : null}
              >
                {children}
              </div>
            </div>
          </td>
        </tr>
      );
    }
  }
);
Grid.defaultProps = {
  alignContent: "center",
  justifyContent: "left",
  item: false,
  container: false,
  xs: 12,
  style: {},
};
