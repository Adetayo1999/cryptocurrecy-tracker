import "./banner.css";

export const Banner = () => {
  return (
    <div
      className={`banner__container h-[40vh] flex justify-center items-center text-slate-50`}
    >
      <h1 className="text-4xl animate-ping-once  ">
        Cryptocurrencies Tracker API
      </h1>
    </div>
  );
};
