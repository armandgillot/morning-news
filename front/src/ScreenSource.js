import React, { useState, useEffect } from "react";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const APIResultsLoading = async () => {
      const result = await fetch(`/news?token=${props.token}`);
      const body = await result.json();
      setSourceList(body);
      setCountry(body.result[0].country);
    };
    // const getLanguage = async () => {
    //   const result = await fetch(`/users/getlanguage?token=${props.token}`);
    //   const body = await result.json();
    //   setCountry(body.language);
    // };
    // getLanguage();
    APIResultsLoading();
  }, []);
  console.log(country);
  var changeCountry = async (country) => {
    await fetch(`/news?token=${props.token}&country=${country}`, {
      method: "PUT",
    });
    const APIResultsLoading = async () => {
      const result = await fetch(`/news?token=${props.token}`);
      const body = await result.json();
      setSourceList(body);
      console.log(body);
    };
    APIResultsLoading();
    setCountry(country);
  };

  return (
    <div>
      <Nav />
      <div className="Banner">
        <Avatar
          onClick={() => changeCountry("fr")}
          className="flag"
          src={`/images/fr.png`}
        />
        <Avatar
          onClick={() => changeCountry("gb")}
          className="flag"
          src={`/images/uk.png`}
        />{" "}
      </div>
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList.result}
          renderItem={(source, i) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/images/${source.category}.png`} />}
                title={
                  <Link to={`/screenarticlesbysource/${source.id}`} key={i}>
                    <h3>{source.name}</h3>
                  </Link>
                }
                description={source.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ScreenSource);
