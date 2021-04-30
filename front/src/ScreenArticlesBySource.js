import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  const [sourceList, setSourceList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  console.log(props.token);
  console.log(sourceList);

  var { id } = useParams();

  useEffect(() => {
    const APIResultsLoading = async () => {
      const result = await fetch(`/news-bysource?id=${id}`);
      const body = await result.json();
      setSourceList(body.result);
    };
    APIResultsLoading();
  }, []);

  var showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  var handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  var handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="Card">
        {sourceList.map((article, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: 300,
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={<img alt="example" src={article.urlToImage} />}
              actions={[
                <Icon
                  type="read"
                  key="ellipsis2"
                  onClick={() => showModal(article.title, article.content)}
                />,
                <Icon
                  type="like"
                  key="ellipsis"
                  onClick={() => {
                    props.addToWishList(article);
                  }}
                />,
              ]}
            >
              <Meta title={article.title} description={article.description} />
            </Card>

            <Modal
              title={title}
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>{content}</p>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({ type: "addArticle", articleLiked: article });
    },
  };
}
function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
