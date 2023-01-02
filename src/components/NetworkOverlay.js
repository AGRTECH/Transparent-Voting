import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import leftArrow from "../img/larrow.png";
import "./App.css";

function NetworkOverlay() {
  const renderTooltip = (props) => <Tooltip {...props}>Goerli</Tooltip>;

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 150, hide: 50 }}
      overlay={renderTooltip}
    >
      <a className="down-arrow">
        <img
          src={leftArrow}
          style={{
            width: "8px",
            height: "15px",
            rotate: "270deg",
            marginLeft: "5px",
          }}
          alt=""
        />
      </a>
    </OverlayTrigger>
  );
}

export default NetworkOverlay;
