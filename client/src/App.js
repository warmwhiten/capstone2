import { useEffect, useState } from "react";
import { postAPI } from "./api";
import styled from "styled-components";
import LeftContainer from "./components/LeftContainer";
import TextField from "@mui/material/TextField";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [document, setDocument] = useState("");
  const [keyword, setKeyword] = useState("");
  const [zipNum, setZipNum] = useState(0);
  const [documentSummary, setDocumentSummary] = useState("");
  const [encodedImage, setEncodedImage] = useState("");
  const [isImageExist, setIsImageExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeKeyword = (event) => {
    console.log(event.target.value);

    setKeyword(event.target.value);
  };

  const handleChangeDocument = (event) => {
    console.log(event.target.value);

    setDocument(event.target.value);
  };

  const handleChangeZipNum = (event) => {
    console.log(event.target.value);
    setZipNum(event.target.value);
  };

  const handleChangeSum = (event) => {
    setDocumentSummary(event.target.value);
  };

  const handleClickSend = async () => {
    setIsLoading(true);
    const response = await postAPI(document, keyword, zipNum);
    setDocumentSummary(response.data.document);
    setEncodedImage("data:image/png;base64, " + response.data.image);
    setIsImageExist(true);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [documentSummary, encodedImage]);

  return (
    <div className="App" style={{ height: "100vh" }}>
      <AppContainer>
        <div className="title">자기소개서 요약 시스템</div>
        <div className="container">
          <LeftContainer
            handleChangeDocument={handleChangeDocument}
            handleChangeKeyword={handleChangeKeyword}
            handleChangeZipNum={handleChangeZipNum}
            setDocumentSummary={setDocumentSummary}
            setEncodedImage={setEncodedImage}
            handleClickSend={handleClickSend}
            zipNum={zipNum}
            document={document}
          />
          {/**        <div className="leftContainer">
          <Keyword placeholder="키워드" onChange={handleChangeKeyword} />
          <input placeholder="압축률" onChange={handleChangeZipNum} />
          <div>
            <input placeholder="문서" onChange={handleChangeDocument} />
          </div>
          <span>{document.length}</span>
          <button onClick={handleClickSend}>전송</button>
        </div> */}

          <div className="rightContainer">
            {isLoading && (
              <div className="loading">
                <ClipLoader size={50} />
              </div>
            )}
            <div className="rightHeader">요약 결과</div>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              value={documentSummary}
              rows={10}
              onChange={handleChangeSum}
            />
            <div className="imageContainer">
              {isImageExist && <img src={encodedImage} alt={"이미지"} />}
            </div>
          </div>
        </div>
      </AppContainer>
    </div>
  );
}

export default App;

export const AppContainer = styled.div`
  margin: 30px 200px;
  .imageContainer {
    width: 400px;
    height: 400px;
    margin: 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
    margin: 0 0 30px;
    font-size: 25px;
    font-weight: 700;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .rightContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 60px 0;
    width: 100%;
    .rightHeader {
      position: absolute;
      padding-left: 60px;
      top: 0;
      left: 0;
      font-weight: 600;
    }
    .loading {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: lightgray;
      opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const Keyword = styled.input`
  background-color: black;
`;
