import { Box } from "@chakra-ui/react";

export const Wrapper = (props) => (
  <Box
    width="100%"
    display="flex"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
    height="50rem"
    textAlign="center"
    {...props}
  />
);
