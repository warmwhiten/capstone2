import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { fontSize } from "@mui/system";

const zipNumList = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const Wrapper = styled.div`
  width: 100%;
  padding: 0 60px;
  border-right: 1px solid lightgray;
  .top {
    display: flex;
    flex-direction: row;
    .top1 {
      width: 100%;
      margin-right: 10px;
      margin-top: 16px;
    }
    .top2 {
      width: 100%;

      margin-right: 10px;
    }
    .top3 {
      margin-top: 16px;

      width: 50%;
    }
  }
  .number {
    color: gray;
    margin-top: 4px;
  }
`;

const LeftContainer = ({
  handleChangeKeyword,
  handleChangeDocument,
  handleChangeZipNum,
  setDocumentSummary,
  setEncodedImage,
  zipNum,
  handleClickSend,
  document,
}) => {
  return (
    <Wrapper>
      <div className="top">
        <div className="top1">
          <TextField
            fullWidth
            required
            label="요약할 중심 키워드"
            variant="outlined"
            onChange={handleChangeKeyword}
          />
        </div>
        <div className="top2">
          <TextField
            fullWidth
            required
            label="압축률"
            variant="outlined"
            onChange={handleChangeZipNum}
            helperText="1-99사이 숫자 입력"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            margin="normal"
          />
        </div>
        <div className="top3">
          <Button
            fullWidth
            variant="contained"
            height="56px"
            startIcon={<ChangeCircleIcon />}
            style={{ height: "56px", fontSize: "15px" }}
            onClick={handleClickSend}
          >
            요약하기
          </Button>
        </div>
      </div>
      <TextField
        required
        label="자기소개서 입력"
        variant="outlined"
        onChange={handleChangeDocument}
        fullWidth
        multiline
        rows={23}
      />
      <div className="number">글자수 | {document.length} 자</div>
    </Wrapper>
  );
};

export default LeftContainer;
