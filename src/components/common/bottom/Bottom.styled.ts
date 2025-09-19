import styled from "styled-components";
import LinkNext from "next/link";

export const Wrapper = styled.footer`
  width: 100%;
  padding: 80px 0;
  display: flex;
  justify-content: center;
  gap: 140px;
  background-color: #efefef;
  font-family: var(--font-family-base);
  font-size: var(--font-body2);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-main);

  user-select: none;
  -webkit-user-select: none; /* Safari/Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE */
`;

export const Link = styled(LinkNext)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;
