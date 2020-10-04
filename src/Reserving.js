import React, { useState } from "react";
import _ from "lodash";
import Moment from "react-moment";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

export default function Reserving() {
  const [selectPage, setselectPage] = useState("Home");

  const [inputList, setInputList] = useState([
    { name: "", seat: "", date: "" },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", seat: "", date: "" }]);
  };
  console.log(inputList);
  const PageSelector = () => {
    if (selectPage === "Home") {
      return (
        <>
          <div className="home">
            <div className="ml3">
              <div className="ml4 slide-in-left">Restaurant Reserve</div>
              <div className="homeAlign">
                <div className="marginMiddle slide-in-left">By</div>
                <div className="marginBottom focus-in-contract">REACT</div>
              </div>
            </div>
            <button
              className="homeButton"
              onClick={() => {
                setselectPage("Reserve");
              }}
            >
              Reserve Here
            </button>
          </div>
        </>
      );
    }
    if (selectPage === "Show All Reserve") {
      const result = _(inputList)
        .groupBy("date")
        .map((v, date) => {
          const seat = v.map((v) => v.seat);
          const name = v.map((v) => v.name);
          return {
            date,
            seat,
            name,
          };
        })
        .value();
      // var grouped = _.groupBy(inputList, function (date) {
      //   return date.date;
      // });
      console.log(result);

      const RenderReserveList = () => {
        const listItems = result.map((data) => (
          <ListReserve key={data.date} data={data} />
        ));
        return (
          <div className="tableList">
            <div className="listContainer">
              <div className="columnDetail1">Date</div>
              <div className="columnDetail1">Name </div>
              <div className="columnDetail1">Seat</div>
            </div>
            {listItems}
          </div>
        );
      };

      const ListReserve = ({ data }) => {
        if (data.date === "") {
          return (
            <>
              <div></div>
            </>
          );
        }
        return (
          <div>
            <div>
              <h6 className="textArray">
                <Moment format="DD-MM-YYYY HH:mm">{data.date}</Moment>
              </h6>
              <h5 className="textArray">
                {data.name}
                <br />
              </h5>
              <h5 className="textArray">
                {data.seat}
                <br />
              </h5>
            </div>
          </div>
        );
      };

      return (
        <>
          <div className="reserve">
            <RenderReserveList />
          </div>
        </>
      );
    }
    if (selectPage === "Reserve") {
      return (
        <>
          <div className="reserve">
            {inputList.map((x, i) => {
              return (
                <div class="form-row p-2">
                  <div div class="col">
                    <input
                      class="form-control"
                      name="name"
                      value={x.name}
                      placeholder="Name"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  <div div class="col">
                    <input
                      class="form-control"
                      type="number"
                      name="seat"
                      min="1"
                      max="5"
                      value={x.seat}
                      placeholder="Seat"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  <div div class="col">
                    <input
                      class="form-control"
                      type="datetime-local"
                      name="date"
                      placeholder="Reserve Date"
                      value={x.date}
                      onChange={(e) => handleInputChange(e, i)}
                    ></input>
                  </div>
                  <div className="btn-box">
                    {inputList.length !== 1 && (
                      <button
                        class="btn btn-md btn-danger"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                    {inputList.length - 1 === i && (
                      <button
                        class="btn btn-md btn-secondary"
                        onClick={handleAddClick}
                      >
                        Reserve
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
    }
  };

  return (
    <div class="inner">
      <div className="reserve">
        <div class="btn-group btn-group-lg " role="group">
          <button
            class="btn btn-outline-light"
            onClick={() => {
              setselectPage("Home");
            }}
          >
            Home
          </button>
          <button
            class="btn btn-outline-light"
            onClick={() => {
              setselectPage("Reserve");
            }}
          >
            Reserve
          </button>
          <button
            class="btn btn-outline-light"
            onClick={() => {
              setselectPage("Show All Reserve");
            }}
          >
            Show All Reserve
          </button>
        </div>
        <PageSelector />
      </div>
    </div>
  );
}
