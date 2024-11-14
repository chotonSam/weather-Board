import logo from "../../assets/logo.svg";

export default function Logo() {
  return (
    <a href="./index.html">
      <img className="h-9 mb-3 sm:mb-0" src={logo} alt="Weather App" />
    </a>
  );
}
