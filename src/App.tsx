import React from 'react';
import SkillChecker from './SkillChecker';

import { ThemeProvider } from 'theme-ui';
import { Flex, Box, Text } from 'rebass';
import theme from './theme';

const App: React.FC = () => {
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Flex flexWrap='wrap'>
        <Box className='App' width={1/2} p={3}>
          <header className="App-header">
            <Text fontWeight='bold' fontSize={3} pb={3}>Omen Dashboard</Text>
            <SkillChecker/>
          </header>
        </Box>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
