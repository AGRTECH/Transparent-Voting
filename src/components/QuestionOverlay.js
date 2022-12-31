import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Question from "../img/transparentquestionmark.png";
import "./App.css";

function QuestionOverlay() {
  const renderTooltip = (props) => (
    <Tooltip {...props}>
      Create a poll with any categories or canidates that you'd like and they'll
      appear in the active voting section for participants to vote
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 150, hide: 50 }}
      overlay={renderTooltip}
    >
      <img
        src={Question}
        style={{
          width: "30px",
          height: "25px",
          marginBottom: "20px",
          marginLeft: "220px",
        }}
        alt=""
      />
    </OverlayTrigger>
  );
}

export default QuestionOverlay;
