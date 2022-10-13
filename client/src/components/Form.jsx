import { FormControl } from "@chakra-ui/react";
import styled from "styled-components";

export const Form = styled.form`
  width: 85%;
  max-width: 350px;
  padding: 1.5rem;
  height: auto;
  max-height: 1000px;
  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.3);

  #error {
    color: #fff;
    text-align: left;
    height: auto;
    font-size: 15px;
    border-radius: 6px;
    line-height: 18px;
    background: #eb4d4b;
    padding: 0.5rem 1rem;
    display: none;
  }
`;
