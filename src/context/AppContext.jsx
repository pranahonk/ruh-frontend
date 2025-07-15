// This file serves as the main entry point for the context API
// It re-exports everything from the separate files to maintain backward compatibility

import AppContext from './AppContextUtils';
import { useAppContext } from './AppContextUtils';
import { AppProvider } from './AppProvider';

// eslint-disable-next-line react-refresh/only-export-components
export { AppProvider, useAppContext };
export default AppContext;
