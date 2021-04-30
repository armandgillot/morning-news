import React, { useState, useEffect } from "react";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function ScreenSource() {
  const [sourceList, setSourceList] = useState([]);
  const [country, setCountry] = useState("fr");

  useEffect(() => {
    const APIResultsLoading = async () => {
      const result = await fetch(`/news?country=${country}`);
      const body = await result.json();
      setSourceList(body);
    };
    APIResultsLoading();
  }, []);

  var changeCountry = async (country) => {
    const result = await fetch("/news?country=" + country);
    const body = await result.json();
    setSourceList(body);
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

export default ScreenSource;
