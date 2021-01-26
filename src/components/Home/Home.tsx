import React, { useEffect, useState } from "react";
import { Card, Nav } from "react-bootstrap";
import "./Home.css";

const Home: React.FC<{}> = () => {
  const [dogGif, setDogGif] = useState<any>();
  const [catGif, setCatGif] = useState<any>();

  const baseUrl: string = "/.netlify/functions";

  useEffect(() => {
    fetch(`${baseUrl}/get-dog-gif`)
      .then((response) => response.json())
      .then(({ data }) => {
        const dogGif = data;

        setDogGif(dogGif);
      });

    fetch(`${baseUrl}/get-cat-gif`)
      .then((response) => response.json())
      .then(({ data }) => {
        const catGif = data;

        setCatGif(catGif);
      });
  }, []);

  return (
    <div className="jumbotron">
      <div className="row col-md-12" id="cardDiv">
        <div className="col-md-6 dog-wiki">
          <Card bg="dark">
            <Card.Img
              className="gif-image"
              variant="top"
              src={dogGif?.data.image_original_url}
            />
            <Card.Body>
              <Nav.Item>
                <Nav.Link href="/dog-wiki">Head over to Dog Wiki</Nav.Link>
              </Nav.Item>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 cat-wiki">
          <Card bg="dark">
            <Card.Img
              className="gif-image"
              variant="top"
              src={catGif?.data.image_original_url}
            />
            <Card.Body>
              <Nav.Item>
                <Nav.Link href="/cat-wiki">Head over to Cat Wiki</Nav.Link>
              </Nav.Item>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
