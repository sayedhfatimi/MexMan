import React from "react";
import { Button, Popup } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { removeAccount } from "../store/accounts";

let ConfirmAccountDelete = (props) => {
  const dispatch = useDispatch();

  let id = props.id;

  let handleClick = (e) => {
    e.preventDefault();
    dispatch(removeAccount({ id }));
  };

  return (
    <React.Fragment>
      <Popup
        trigger={
          <Button icon="delete" compact floated="right" color="red" inverted />
        }
        content={
          <Button
            color="red"
            content="Confirm Delete!"
            onClick={handleClick}
            compact
          />
        }
        on="click"
        position="left center"
      />
    </React.Fragment>
  );
};

export default ConfirmAccountDelete;
