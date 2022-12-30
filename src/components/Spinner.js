import { Spinner } from "react-bootstrap";

function SpinnerAnimation() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default SpinnerAnimation;
