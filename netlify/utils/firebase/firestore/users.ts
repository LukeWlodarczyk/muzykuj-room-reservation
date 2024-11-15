import { firestoreAdmin } from "../firebase";

export const getUserByEmail = async (email: string) => {
  const snapshot = await firestoreAdmin
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snapshot.empty) return null;

  const document = snapshot.docs[0];
  const user = document.data();

  return { id: document.id, email: user.email, access: user.access };
};
