import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Question from "../img/darkerqmark.png";
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
        className="question-img"
        src={Question}
        style={{
          width: "27px",
          height: "23px",
          marginBottom: "20px",
          position: "relative",
        }}
        alt=""
      />
    </OverlayTrigger>
  );
}

export default QuestionOverlay;
