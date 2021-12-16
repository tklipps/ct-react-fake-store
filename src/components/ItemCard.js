import React, { Component } from "react";
import { Card, Col, Button } from "react-bootstrap";
import { titleCase } from "../helpers";

export default class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  handleRenderItem = () => {
    this.setState({ clicked: true });
  };

  render() {
    return (
      <Col>

        <Card style={{ width: "150px", height: "400px", marginBottom: "25px" }}>
          <Card.Img
            variant="top"
            style={{ height: "100px", objectFit: "contain" }}
            alt={this.props.item.name + " image"}
            src={
              this.props.item.image ??
              "https://designshack.net/wp-content/uploads/placehold.jpg"
            }
          />
          <Card.Body>
            <Card.Title>
              {titleCase(this.props.item.title) ?? "Generic Item"}<br/>
              {titleCase(this.props.item.category)}
            </Card.Title>
            <Card.Text className="card-subtitle text-muted text-truncate">
              {this.props.item.description ?? "Sorry No Description"}
            </Card.Text>
            <Card.Subtitle className="float-end">
              ${this.props.item.price ?? "?.??"}{" "}
            </Card.Subtitle>
            <br />
            <button
              style={{
                backgroundColor: "white",
                border: "none",
                color: "blue",
              }}
              onClick={() => this.handleRenderItem()}
            >
              See More
            </button>
            <Button variant="primary" onClick={()=>this.props.addToCart(this.props.item)}> Add To Cart</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}