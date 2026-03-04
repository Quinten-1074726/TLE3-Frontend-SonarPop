import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton.jsx";
import SecondaryButton from "./SecondaryButton.jsx";


function Layout() {
  return (
    <nav className="flex gap-6 p-4 bg-secondary">
        <PrimaryButton>primary button</PrimaryButton>
        <SecondaryButton>secondary button</SecondaryButton>

    </nav>
  );
}

export default Layout;