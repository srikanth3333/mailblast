import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth/userSlice";
import uploadReducer from "./fileUpload/fileUploadSlice";
import contactsReducer from "./getContacts/index";
import reportsReducer from "./mailMessages/index";

export default configureStore({
	reducer: {
		auth:authReducer,
		uploadData:uploadReducer,
		contacts:contactsReducer,
		reports:reportsReducer
	},
});