import ky from 'ky';
import auth from './auth';

const dbBase = 'http://localhost:8080';

const api = {
  auth: {
    async show(email, password) {
      try {
        if (email && password) {
          const user = await auth.signInWithEmailAndPassword(email, password);
          return user;
        }

        return auth.currentUser;
      } catch (error) {
        throw new Error(error);
      }
    },

    async create(email, password) {
      try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    update(email) {
      return auth
        .sendPasswordResetEmail(email)
        .then(() => 'Check your email for a link to reset your password.')
        .catch(error => {
          throw new Error(error);
        });
    },

    delete() {
      return auth
        .signOut()
        .then(() => true)
        .catch(error => {
          throw new Error(error);
        });
    },
  },
  photo: {
    async create(imgFile) {
      const fd = new FormData();
      fd.append('file', imgFile);
      fd.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

      const resp = await ky
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { body: fd }
        )
        .json();
      return resp;
    },
  },
  db: {
    async create(path, payload) {
      try {
        const resp = await ky
          .post(`${dbBase}/${path}`, { json: payload })
          .json();

        return resp;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default api;
