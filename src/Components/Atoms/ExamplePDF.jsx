import React from "react";
import ReactToPrint from "react-to-print";
import Write from "./Write";



class ExamplePDF extends React.Component {
  render() {
    return (
      <div>
        <Write ref={(el) => (this.componentRef = el)} />
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}

export default ExamplePDF;