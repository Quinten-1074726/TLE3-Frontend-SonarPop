import { Link } from "react-router-dom";

function PageHeader({ title, showTitle = true }) {
  return (
    <header
      className="
        flex items-center justify-between
        px-6 pt-10 pb-4
      "
    >
      {showTitle ? (
        <h1 className="h2 pr-4 leading-tight break-words">
          {title}
        </h1>
      ) : (
        <div />
      )}

      <Link to="/profile">
        <div
          className="
            w-10 h-10
            rounded-full
            bg-white/20
            border border-white/20
            flex items-center justify-center
          "
        >
          { /* avatar */ }
        </div>
      </Link>
    </header>
  );
}

export default PageHeader;