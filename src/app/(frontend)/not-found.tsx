import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <style>
          {`
            .next-error-h1 {
              border-right: 1px solid rgba(0, 0, 0, 0.3);
              margin: 0;
              margin-right: 20px;
              padding: 10px 23px 10px 0;
              font-size: 24px;
              font-weight: 500;
              vertical-align: top;
              display: inline-block;
            }
            .next-error-div {
              display: inline-block;
              text-align: left;
              line-height: 49px;
              height: 49px;
              vertical-align: middle;
            }
            .next-error-h2 {
              font-size: 14px;
              font-weight: normal;
              line-height: inherit;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
        <h1 className="next-error-h1">404</h1>
        <div className="next-error-div">
          <h2 className="next-error-h2">找不到此页面。</h2>
        </div>
      </div>
    </div>
  );
}
