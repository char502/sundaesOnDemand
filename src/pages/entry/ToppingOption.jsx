import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

function ToppingOption({ name, imagePath, updateItemCount }) {
  return (
    <Col xs={6} sm={6} md={2} lg={2} style={{ textAlign: 'center' }}>
      <div>
        <img
          style={{ width: '75%' }}
          src={`http://localhost:3030/${imagePath}`}
          alt={`${name} topping`}
        />
      </div>

      <Form.Group
        controlId={`${name}-topping-checkbox`}
        /* as={Row}
        style={{ marginTop: '10px' }} */
      >
        <Form.Check
          type='checkbox'
          onChange={e => updateItemCount(name, e.target.checked ? 1 : 0)}
          label={name}
        />
      </Form.Group>
    </Col>
  );
}

export default ToppingOption;
