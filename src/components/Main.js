import React, { Component, useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import CreatePoll from "./CreatePoll";
import ActivePolls from "./ActivePolls";
import Results from "./Results";
import "./App.css";
import { Modal, Button } from "react-bootstrap";
import {
  subscribeToEvents,
  loadAllData,
  loadVoting,
  loadWeb3,
} from "../store/interactions";
import { votingSelector, votingLoadedSelector } from "../store/selectors";
import { connect } from "react-redux";

const Main = (props) => {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadBlockchainData = async (dispatch) => {
    const web3 = loadWeb3(dispatch);
    await web3.eth.net.getNetworkType();
    const networkId = await web3.eth.net.getId();
    const voting = await loadVoting(web3, networkId, dispatch);
    if (!voting) {
      setShow(true);
    } else {
      await loadAllData(voting, dispatch);
      await subscribeToEvents(voting, dispatch);
    }
  };

  if (!mounted) {
    loadBlockchainData(props.dispatch);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <CreatePoll />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-title">
          <Modal.Title className="modal-title">
            Wrong network detected
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please switch to the goerli network on your metamask wallet
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
function mapStateToProps(state) {
  return {
    voting: votingSelector(state),
    votingLoaded: votingLoadedSelector(state),
  };
}

export default connect(mapStateToProps)(Main);
