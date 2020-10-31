import Head from 'next/head'
import { Codestain as CodestainFunc } from "../../../dist/Codestain";

const Codestain = (props) => {
  const rawHtml = {
    __html: CodestainFunc(props.language, props.children)
  };
  return (
    <pre
      style={{
        fontSize: '1.5rem',
        fontFamily: 'Consolas'
      }}
      dangerouslySetInnerHTML={rawHtml} // TODO (al): codestain will emit JSX in the future. This approach isn't final.
    ></pre>
  );
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>codestain - Next.js example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
            codestain - Next.js example
        </h1>
        <Codestain language="JavaScript">
          {`const greeting = "Hello world!";`}
        </Codestain>
      </main>

      <footer></footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #1e1e1e;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.2;
          font-size: 3rem;
          color: #fff;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
