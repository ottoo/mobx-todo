import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
        </Head>
        <title>Todo</title>
        {this.props.styleTags}
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
