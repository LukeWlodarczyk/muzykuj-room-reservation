import { getFirestore } from "firebase/firestore";

import { app } from "@/services/firebase";

export const firestore = getFirestore(app);
