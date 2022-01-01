import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);

  const popoverTC = (
    <Popover id='popover-basic'>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I Agree to the{' '}
      <OverlayTrigger placement='right' overlay={popoverTC}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Form>
        <Form.Group controlId='terms-and-conditions'>
          <Form.Check
            type='checkbox'
            label={checkboxLabel}
            checked={tcChecked}
            onChange={e => {
              setTcChecked(e.target.checked);
            }}
          />
        </Form.Group>
        <Button variant='primary' type='submit' disabled={!tcChecked}>
          Confirm order
        </Button>
      </Form>
    </div>
  );
}

export default SummaryForm;
