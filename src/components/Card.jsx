import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample({img,title,text}) {
  return (
    <Card className="CostumCard">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {text}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;