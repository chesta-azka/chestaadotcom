const { getApp } = require('firebase/app');
try {
  getApp();
} catch (e) {
  console.log(e);
}
