import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Table, Button } from "react-bootstrap";
import AnswerForm from "./AnswerForm";
import { useState } from "react";

function Answers (props) {
  const [mode, setMode] = useState("view");
  const [editableAnswer, setEditableAnswer] = useState();

  const handleEdit = (answer) => {
    setEditableAnswer(answer);
    setMode("edit");
  }

  return(
    <>
    <Row>
      <Col as="h2">Answers:</Col>
    </Row>
    <Row>
      <Col lg={10} className="mx-auto">
        <AnswerTable answers={props.answers} voteUp={props.voteUp} handleEdit={handleEdit} />

        { mode === "view" && <Button variant="primary" onClick={() => setMode("add")}>Add</Button>}

        { mode === "add" && <AnswerForm addAnswer={(answer) => {props.addAnswer(answer); setMode("view");}} cancel={() => setMode("view")}/>}

        { mode === "edit" && <AnswerForm key={editableAnswer.id} answer={editableAnswer} editAnswer={(answer) => {props.editAnswer(answer); setMode("view");}} cancel={() => setMode("view")} />}
      </Col>
    </Row>
    </>
  );
}

function AnswerTable (props) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { props.answers.map((ans) => <AnswerRow key={ans.id} answer={ans} voteUp={props.voteUp} handleEdit={props.handleEdit} />) }
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer} /><AnswerAction {...props} /></tr>
  );
}

function AnswerData(props) {
  return(
    <>
      <td>{props.answer.date.format("YYYY-MM-DD")}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerAction(props) {
  return(
    <td>
      <Button variant="warning" onClick={() => {props.voteUp(props.answer.id)}}><i className="bi bi-arrow-up" /></Button>
      <Button variant="primary" className="mx-1" onClick={() => props.handleEdit(props.answer)}><i className="bi bi-pencil-square" /></Button> 
      <Button variant="danger"><i className="bi bi-trash" /></Button>
    </td>
  );
}

export default Answers;