/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Nav, Spinner } from "react-bootstrap";
import "./Home.css";

const Home: React.FC<{}> = () => {
  const [dogGif, setDogGif] = useState<any>();
  const [catGif, setCatGif] = useState<any>();
  const [srcDog, setSrcDog] = useState<string>("");
  const [srcCat, setSrcCat] = useState<string>("");
  const [srcDogGif, setSrcDogGif] = useState<string>("");
  const [srcCatGif, setSrcCatGif] = useState<string>("");
  const [srcDogImage, setSrcDogImage] = useState<string>("");
  const [srcCatImage, setSrcCatImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isDogMouseEvent, setIsDogMouseEvent] = useState<boolean>(false);
  const [isCatMouseEvent, setIsCatMouseEvent] = useState<boolean>(false);

  const baseUrl: string = "/.netlify/functions";

  useEffect(() => {
    fetch(`${baseUrl}/get-dog-gif`)
      .then((response) => response.json())
      .then(({ data }) => {
        const dogGif = data;
        setLoading(false);
        setDogGif(dogGif);
        setSrcDogImage(dogGif?.data?.images?.original_still?.url);
        setSrcDogGif(dogGif?.data?.image_original_url);
        setSrcDog(srcDogImage);
      });

    fetch(`${baseUrl}/get-cat-gif`)
      .then((response) => response.json())
      .then(({ data }) => {
        const catGif = data;
        setLoading(false);
        setCatGif(catGif);
        setSrcCatImage(catGif?.data?.images?.original_still?.url);
        setSrcCatGif(catGif?.data?.image_original_url);
        setSrcCat(srcCatImage);
      });
  }, []);

  const handleMouseEnter = (pet: string) => {
    if (pet === "dog") {
      setIsDogMouseEvent(true);
      setSrcDog(srcDogGif);
    } else if (pet === "cat") {
      setIsCatMouseEvent(true);
      setSrcCat(srcCatGif);
    }
  };

  const handleMouseLeave = (pet: string) => {
    if (pet === "dog") {
      setSrcDog(srcDogImage);
    } else if (pet === "cat") {
      setSrcCat(srcCatImage);
    }
  };

  return (
    <div className="jumbotron">
      {loading ? (
        <div className="loading-cards">
          Please wait while we complete loading...{" "}
          <Spinner animation="border"></Spinner>
        </div>
      ) : (
        <div className="row col-md-12" id="cardDiv">
          <div className="col-md-6 dog-wiki">
            <Card
              bg="dark"
              onMouseEnter={() => {
                handleMouseEnter("dog");
              }}
              onMouseLeave={() => {
                handleMouseLeave("dog");
              }}
            >
              <Card.Img
                className="gif-image"
                variant="top"
                src={
                  isDogMouseEvent
                    ? srcDog
                    : dogGif?.data?.images?.original_still?.url
                }
              />
              <Card.Body>
                <Nav.Item>
                  <Nav.Link href="/dog-wiki">Head over to Dog Wiki</Nav.Link>
                </Nav.Item>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6 cat-wiki">
            <Card
              bg="dark"
              onMouseEnter={() => {
                handleMouseEnter("cat");
              }}
              onMouseLeave={() => {
                handleMouseLeave("cat");
              }}
            >
              <Card.Img
                className="gif-image"
                variant="top"
                src={
                  isCatMouseEvent
                    ? srcCat
                    : catGif?.data?.images?.original_still?.url
                }
              />
              <Card.Body>
                <Nav.Item>
                  <Nav.Link href="/cat-wiki">Head over to Cat Wiki</Nav.Link>
                </Nav.Item>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
