import app from ".";
import { getDatabase } from "firebase/database";

const db = getDatabase(app);
export default db;
