import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="mx-4 md:mx-20 lg:mx-60 my-[10vh]">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
