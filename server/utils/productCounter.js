// utils/productCounter.js
const { db } = require('../config/firebase');

const { doc, setDoc, collection, getDoc, updateDoc } = require('firebase/firestore');


async function getNextProductId() {
  const counterRef = doc(db, 'counters', 'products');
  const counterSnap = await getDoc(counterRef);
  
  if (!counterSnap.exists()) {
    // Initialize counter if it doesn't exist
    await setDoc(counterRef, { lastId: 0 });
    return 1;
  }
  
  const lastId = counterSnap.data().lastId;
  const newId = lastId + 1;
  
  // Atomically increment the counter
  await updateDoc(counterRef, {
    lastId: newId
  });
  
  return newId;
}

module.exports = { getNextProductId };